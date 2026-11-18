// Bowl builder logic: options, defaults, the counter estimate and the shareable link.
// Pure functions so the builder, the static fallback and the tests agree.
import { bowlBase, bowlSteps, defaultHerbs, type BowlOption, type BowlStep } from '../content/bowl.ts';
import { herbs as herbList, type Herb } from '../content/herbs.ts';

export type Size = 'small' | 'large';
export interface BowlSelection {
  size: Size;
  broth: string;
  noodles: string;
  protein: string[];
  garnish: string[];
}
export interface ResolvedOption extends BowlOption { herb?: boolean }

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const cents = (value: number) => Math.round(value * 100);

/** A step's options, with referenced herbs expanded (free, available while in the basket). */
export function stepOptions(step: BowlStep, herbs: readonly Herb[] = herbList): ResolvedOption[] {
  const fromHerbs = (step.herbs ?? []).map(id => {
    const herb = herbs.find(entry => entry.id === id);
    if (!herb) throw new Error(`bowl: step "${step.id}" refers to herb "${id}", which is not in content/herbs.ts`);
    return { id: herb.id, name: herb.name, vietnamese: herb.vietnamese, surcharge: 0, available: herb.inBasket,
      default: defaultHerbs.includes(herb.id), herb: true } satisfies ResolvedOption;
  });
  return [...fromHerbs, ...step.options];
}

export function stepById(id: BowlStep['id'], steps: readonly BowlStep[] = bowlSteps): BowlStep {
  const step = steps.find(entry => entry.id === id);
  if (!step) throw new Error(`bowl: missing step "${id}"`);
  return step;
}

/** Throws with the step/option to fix. Runs in tests and at build time. */
export function validateBowl(steps: readonly BowlStep[] = bowlSteps, herbs: readonly Herb[] = herbList, base = bowlBase): void {
  if (!(base.small > 0 && base.large > base.small && base.large <= 40)) throw new Error('bowl: base prices need 0 < small < large ≤ 40');
  const expected: BowlStep['id'][] = ['broth', 'noodles', 'protein', 'garnish'];
  if (steps.map(step => step.id).join() !== expected.join()) throw new Error(`bowl: steps must be ${expected.join(', ')} in that order`);
  const ids = new Set<string>();
  for (const step of steps) {
    for (const key of ['title', 'vietnamese', 'instruction'] as const) if (!step[key]?.trim()) throw new Error(`bowl: step "${step.id}" needs a ${key}`);
    const options = stepOptions(step, herbs);
    if (!options.length) throw new Error(`bowl: step "${step.id}" has no options`);
    for (const option of options) {
      const where = `option "${option.id}" in step "${step.id}"`;
      if (!SLUG.test(option.id)) throw new Error(`bowl: ${where} must be lowercase letters, numbers and hyphens`);
      if (ids.has(option.id)) throw new Error(`bowl: ${where} reuses an id from another option`);
      ids.add(option.id);
      if (!option.name.trim() || !option.vietnamese.trim()) throw new Error(`bowl: ${where} needs a name and vietnamese name`);
      if (!(option.surcharge >= 0 && option.surcharge <= 6) || cents(option.surcharge) !== option.surcharge * 100) {
        throw new Error(`bowl: ${where} surcharge ${option.surcharge} must be between 0 and 6 dollars`);
      }
      if (option.addOn && step.id !== 'protein') throw new Error(`bowl: ${where} can only be an add-on in the protein step`);
    }
    if (step.choose === 'one') {
      const defaults = options.filter(option => option.default);
      if (defaults.length !== 1) throw new Error(`bowl: step "${step.id}" needs exactly one default option (has ${defaults.length})`);
      if (!defaults[0].available) throw new Error(`bowl: step "${step.id}" default "${defaults[0].id}" is marked unavailable; choose another default`);
    } else if (step.extraPrice !== undefined && !(step.extraPrice >= 0 && step.extraPrice <= 6)) {
      throw new Error(`bowl: step "${step.id}" extraPrice must be between 0 and 6 dollars`);
    }
  }
  for (const id of defaultHerbs) if (!herbs.some(herb => herb.id === id)) throw new Error(`bowl: default herb "${id}" is not in content/herbs.ts`);
}

const available = (step: BowlStep, herbs: readonly Herb[]) => stepOptions(step, herbs).filter(option => option.available);

export function defaultSelection(steps: readonly BowlStep[] = bowlSteps, herbs: readonly Herb[] = herbList): BowlSelection {
  const one = (id: BowlStep['id']) => available(stepById(id, steps), herbs).find(option => option.default)?.id
    ?? available(stepById(id, steps), herbs)[0]?.id ?? '';
  const many = (id: BowlStep['id']) => available(stepById(id, steps), herbs).filter(option => option.default).map(option => option.id);
  return { size: 'small', broth: one('broth'), noodles: one('noodles'), protein: many('protein'), garnish: many('garnish') };
}

/** Counter estimate in dollars: base + surcharges + extra proteins beyond the included one. */
export function bowlTotal(selection: BowlSelection, steps: readonly BowlStep[] = bowlSteps, herbs: readonly Herb[] = herbList, base = bowlBase): number {
  let total = cents(base[selection.size]);
  for (const step of steps) {
    const chosen = step.choose === 'one' ? [selection[step.id as 'broth' | 'noodles']] : selection[step.id as 'protein' | 'garnish'];
    const options = stepOptions(step, herbs).filter(option => chosen.includes(option.id));
    total += options.reduce((sum, option) => sum + cents(option.surcharge), 0);
    if (step.choose === 'many' && step.extraPrice) {
      const counted = options.filter(option => !option.addOn).length;
      total += Math.max(0, counted - (step.included ?? 0)) * cents(step.extraPrice);
    }
  }
  return total / 100;
}

/** "#beef,banh-pho,tai+chin,thai-basil+lime,small" — readable at the counter, no personal data. */
export function encodeSelection(selection: BowlSelection): string {
  return [selection.broth, selection.noodles, selection.protein.join('+'), selection.garnish.join('+'), selection.size].join(',');
}

/** Unknown or unavailable ids fall back to the default (choose-one) or are dropped (choose-many). */
export function decodeSelection(hash: string, steps: readonly BowlStep[] = bowlSteps, herbs: readonly Herb[] = herbList): BowlSelection {
  const fallback = defaultSelection(steps, herbs);
  let text = hash.replace(/^#/, '');
  try { text = decodeURIComponent(text); } catch { return fallback; }
  if (!text) return fallback;
  const [broth = '', noodles = '', protein = '', garnish = '', size = ''] = text.split(',');
  const ok = (id: BowlStep['id']) => new Set(available(stepById(id, steps), herbs).map(option => option.id));
  const list = (value: string, id: BowlStep['id']) => [...new Set(value.split('+').filter(entry => ok(id).has(entry)))];
  return {
    size: size === 'large' ? 'large' : 'small',
    broth: ok('broth').has(broth) ? broth : fallback.broth,
    noodles: ok('noodles').has(noodles) ? noodles : fallback.noodles,
    protein: list(protein, 'protein'),
    garnish: list(garnish, 'garnish'),
  };
}
