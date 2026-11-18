import { freeItems, MAX_PRICE, menu, TAGS, type MenuItem, type MenuSection } from '../content/menu.ts';
import { herbs, type Herb } from '../content/herbs.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** "$13.50"; 0 renders as "Free" for listed free items. */
export function formatPrice(value: number): string {
  if (value === 0) return 'Free';
  return `$${value.toFixed(2)}`;
}

/**
 * Printed dish codes, e.g. P1 for the first phở: the section's initial plus the item's position.
 * Reordering items in content/menu.ts renumbers them.
 */
export function dishCodes(sections: readonly MenuSection[] = menu): Map<string, string> {
  const codes = new Map<string, string>();
  for (const section of sections) {
    const prefix = section.id.charAt(0).toUpperCase();
    section.items.forEach((item, index) => codes.set(item.id, `${prefix}${index + 1}`));
  }
  return codes;
}

/** Lowest price of an item, for structured data. */
export function itemPrices(item: MenuItem): number[] {
  return item.sizes ? [item.sizes.small, item.sizes.large] : [item.price ?? NaN];
}

/** Throws with the section/item to fix. Runs in tests and at build time. */
export function validateMenu(sections: readonly MenuSection[] = menu, free: ReadonlySet<string> = freeItems): void {
  const ids = new Set<string>();
  const claim = (id: string, where: string) => {
    if (!SLUG.test(id)) throw new Error(`menu: ${where} id "${id}" must be lowercase letters, numbers and hyphens`);
    if (ids.has(id)) throw new Error(`menu: ${where} id "${id}" is used more than once`);
    ids.add(id);
  };
  if (!sections.length) throw new Error('menu: add at least one section');
  for (const section of sections) {
    claim(section.id, 'section');
    for (const key of ['title', 'vietnamese', 'intro'] as const) {
      if (!section[key]?.trim()) throw new Error(`menu: section "${section.id}" needs a ${key}`);
    }
    if (!section.items.length) throw new Error(`menu: section "${section.id}" has no items`);
    if (section.items.filter(item => item.signature).length > 1) {
      throw new Error(`menu: section "${section.id}" has more than one signature dish`);
    }
    for (const item of section.items) {
      const where = `item "${item.id}" in "${section.id}"`;
      claim(item.id, 'item');
      for (const key of ['name', 'vietnamese', 'description'] as const) {
        if (!item[key]?.trim()) throw new Error(`menu: ${where} needs a ${key}`);
      }
      if ((item.price === undefined) === (item.sizes === undefined)) {
        throw new Error(`menu: ${where} needs either price or sizes, not both`);
      }
      for (const price of itemPrices(item)) {
        const zeroAllowed = free.has(item.id) && price === 0;
        if (!Number.isFinite(price) || (!zeroAllowed && (price <= 0 || price > MAX_PRICE)) || Math.round(price * 100) !== price * 100) {
          throw new Error(`menu: ${where} has price ${price}; use dollars above 0 and up to ${MAX_PRICE}, with at most two decimals`);
        }
      }
      if (item.sizes && item.sizes.large <= item.sizes.small) throw new Error(`menu: ${where} large size must cost more than small`);
      if (typeof item.available !== 'boolean') throw new Error(`menu: ${where} needs available: true or false`);
      for (const tag of item.tags) if (!(tag in TAGS)) throw new Error(`menu: ${where} has unknown tag "${tag}"`);
    }
  }
  for (const id of free) if (!ids.has(id)) throw new Error(`menu: free item "${id}" is not on the menu`);
  const initials = new Map<string, string>();
  for (const section of sections) {
    const initial = section.id.charAt(0);
    if (initials.has(initial)) throw new Error(`menu: sections "${initials.get(initial)}" and "${section.id}" would share dish codes (${initial.toUpperCase()}1, ${initial.toUpperCase()}2…); start one id with a different letter`);
    initials.set(initial, section.id);
  }
}

export function validateHerbs(list: readonly Herb[] = herbs): void {
  const ids = new Set<string>();
  for (const herb of list) {
    if (!SLUG.test(herb.id)) throw new Error(`herbs: id "${herb.id}" must be lowercase letters, numbers and hyphens`);
    if (ids.has(herb.id)) throw new Error(`herbs: id "${herb.id}" is used more than once`);
    ids.add(herb.id);
    for (const key of ['name', 'vietnamese', 'note'] as const) if (!herb[key]?.trim()) throw new Error(`herbs: "${herb.id}" needs a ${key}`);
    if (typeof herb.inBasket !== 'boolean') throw new Error(`herbs: "${herb.id}" needs inBasket: true or false`);
  }
}

export function sectionById(id: string, sections: readonly MenuSection[] = menu): MenuSection {
  const section = sections.find(entry => entry.id === id);
  if (!section) throw new Error(`menu: no section "${id}"`);
  return section;
}

/** The two dishes a Home menu board shows: the signature dish, then the next item in content order. */
export function boardHighlights(section: MenuSection): MenuItem[] {
  const signature = section.items.find(item => item.signature) ?? section.items[0];
  const next = section.items.find(item => item !== signature);
  return next ? [signature, next] : [signature];
}
