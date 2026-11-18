import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bowlSteps, type BowlStep } from '../content/bowl.ts';
import { herbs } from '../content/herbs.ts';
import { bowlTotal, decodeSelection, defaultSelection, encodeSelection, stepOptions, validateBowl, type BowlSelection } from '../lib/bowl.ts';

const steps = () => structuredClone(bowlSteps);
const base: BowlSelection = { size: 'small', broth: 'beef', noodles: 'banh-pho', protein: ['tai'], garnish: [] };

test('the shipped bowl steps are valid and every garnish herb exists', () => {
  assert.doesNotThrow(() => validateBowl());
  const garnish = bowlSteps.find(step => step.id === 'garnish')!;
  for (const id of garnish.herbs ?? []) assert.ok(herbs.some(herb => herb.id === id), id);
});

test('bowl failures name the step or option to fix', () => {
  const broken = (change: (s: BowlStep[]) => void) => { const s = steps(); change(s); return s; };
  assert.throws(() => validateBowl(broken(s => { s[0].options[1].default = true; })), /step "broth" needs exactly one default option \(has 2\)/);
  assert.throws(() => validateBowl(broken(s => { s[1].options[3].surcharge = 7; })), /option "zucchini" in step "noodles" surcharge 7/);
  assert.throws(() => validateBowl(broken(s => { s[2].options[0].id = 'beef'; })), /option "beef" in step "protein" reuses an id/);
  assert.throws(() => validateBowl(broken(s => { s[3].herbs = ['thai-basil', 'rau-ram']; })), /refers to herb "rau-ram"/);
  assert.throws(() => validateBowl(broken(s => { s[0].options[0].available = false; })), /default "beef" is marked unavailable/);
});

test('total = base size price + surcharges + extra proteins beyond the first + egg', () => {
  assert.equal(bowlTotal(base), 13);
  assert.equal(bowlTotal({ ...base, size: 'large' }), 15.5);
  assert.equal(bowlTotal({ ...base, noodles: 'zucchini' }), 14.5);
  assert.equal(bowlTotal({ ...base, protein: ['tai', 'chin'] }), 16);
  assert.equal(bowlTotal({ ...base, protein: ['tai', 'chin', 'bo-vien'] }), 19);
  assert.equal(bowlTotal({ ...base, protein: ['trung'] }), 14.5, 'the egg never uses the included protein');
  assert.equal(bowlTotal({ ...base, protein: ['tai', 'trung'] }), 14.5);
  assert.equal(bowlTotal({ ...base, protein: [] }), 13);
  assert.equal(bowlTotal({ size: 'large', broth: 'mushroom', noodles: 'zucchini', protein: ['tofu', 'ga', 'trung'], garnish: ['thai-basil', 'sate', 'lime'] }), 15.5 + 1.5 + 3 + 1.5);
});

test('the shareable hash round-trips', () => {
  const selection: BowlSelection = { size: 'large', broth: 'chicken', noodles: 'bun', protein: ['ga', 'trung'], garnish: ['mint', 'hanh-phi'] };
  assert.equal(encodeSelection(selection), 'chicken,bun,ga+trung,mint+hanh-phi,large');
  assert.deepEqual(decodeSelection(`#${encodeSelection(selection)}`), selection);
  assert.deepEqual(decodeSelection(''), defaultSelection());
});

test('unknown or unavailable ids in the hash fall back to defaults', () => {
  const fallback = defaultSelection();
  assert.deepEqual(decodeSelection('#lobster,spaghetti,tai+unicorn+tai,mint+%3Cscript%3E,huge'), { ...fallback, protein: ['tai'], garnish: ['mint'] });
  assert.deepEqual(decodeSelection('#%E0%A4%A'), fallback, 'a malformed hash is ignored');
  const noMint = herbs.map(herb => herb.id === 'mint' ? { ...herb, inBasket: false } : herb);
  assert.deepEqual(decodeSelection('#beef,banh-pho,tai,mint+lime', bowlSteps, noMint).garnish, ['lime']);
  assert.equal(stepOptions(bowlSteps[3], noMint).find(option => option.id === 'mint')!.available, false);
});

test('default bowl: beef, flat noodles, rare steak, herbs from today\'s basket', () => {
  assert.deepEqual(defaultSelection(), { size: 'small', broth: 'beef', noodles: 'banh-pho', protein: ['tai'], garnish: ['thai-basil', 'bean-sprouts', 'lime', 'hanh-phi'] });
  const noBasil = herbs.map(herb => herb.id === 'thai-basil' ? { ...herb, inBasket: false } : herb);
  assert.ok(!defaultSelection(bowlSteps, noBasil).garnish.includes('thai-basil'));
});
