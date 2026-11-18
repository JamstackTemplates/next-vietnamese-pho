// Build-your-bowl guide: the four steps of ordering a custom phở or bún bowl at the counter.
// /bowl/ shows these as tickets and draws the chosen bowl; Home shows the step titles.
// Nothing is ordered online: the builder only helps guests decide what to ask for at the counter.
// Prices and surcharges are US dollars.

export interface BowlOption {
  /** Unique, URL-safe id across all steps. Also the key for its drawing in the bowl illustration. */
  id: string;
  name: string;
  vietnamese: string;
  /** Added to the price whenever this option is chosen (0–6). */
  surcharge: number;
  /** Optional short note, e.g. "vegan". */
  note?: string;
  /** Pre-selected in the builder. Exactly one per choose-one step. */
  default?: boolean;
  /** false disables the option with "Not today". */
  available: boolean;
  /**
   * Protein step only: an add-on that never uses the included protein and never costs the
   * extra-protein price (its own surcharge applies instead), e.g. the soft egg.
   */
  addOn?: boolean;
}

export interface BowlStep {
  /** URL-safe id; also the order in the shareable link. */
  id: 'broth' | 'noodles' | 'protein' | 'garnish';
  title: string;
  vietnamese: string;
  instruction: string;
  choose: 'one' | 'many';
  options: BowlOption[];
  /** choose: 'many' steps: how many choices the base price includes. */
  included?: number;
  /** Price of each choice beyond `included` (add-ons excluded). */
  extraPrice?: number;
  /**
   * Garnish step: herbs from content/herbs.ts by id. They are offered free and follow the herb
   * basket's `inBasket` flag.
   */
  herbs?: string[];
}

/** Base bowl price by size, before surcharges. */
export const bowlBase = { small: 13, large: 15.5 };

export const bowlSteps: BowlStep[] = [
  {
    id: 'broth',
    title: 'Broth',
    vietnamese: 'Nước dùng',
    instruction: 'Pick one. Every broth is made here, every morning.',
    choose: 'one',
    options: [
      { id: 'beef', name: 'Slow beef', vietnamese: 'Nước dùng bò', surcharge: 0, note: 'Bones on since 4 a.m., star anise and charred ginger', default: true, available: true },
      { id: 'chicken', name: 'Ginger chicken', vietnamese: 'Nước dùng gà', surcharge: 0, note: 'Clear, gentle and gluten-free', available: true },
      { id: 'mushroom', name: 'Charred shiitake', vietnamese: 'Nước dùng nấm', surcharge: 0, note: 'Vegan, smoky and deep', available: true },
    ],
  },
  {
    id: 'noodles',
    title: 'Noodles',
    vietnamese: 'Bánh',
    instruction: 'Pick one.',
    choose: 'one',
    options: [
      { id: 'banh-pho', name: 'Flat rice noodles', vietnamese: 'Bánh phở', surcharge: 0, default: true, available: true },
      { id: 'wide', name: 'Wide rice noodles', vietnamese: 'Bánh phở to', surcharge: 0, available: true },
      { id: 'bun', name: 'Round vermicelli', vietnamese: 'Bún', surcharge: 0, available: true },
      { id: 'zucchini', name: 'Zucchini ribbons', vietnamese: 'Bí ngòi', surcharge: 1.5, note: 'No noodles at all', available: true },
    ],
  },
  {
    id: 'protein',
    title: 'Protein',
    vietnamese: 'Thịt & đậu',
    instruction: 'The first one is included; each extra is $3. The soft egg is always an extra.',
    choose: 'many',
    included: 1,
    extraPrice: 3,
    options: [
      { id: 'tai', name: 'Rare steak', vietnamese: 'Tái', surcharge: 0, note: 'Cooks in the broth', default: true, available: true },
      { id: 'chin', name: 'Brisket', vietnamese: 'Chín', surcharge: 0, available: true },
      { id: 'bo-vien', name: 'Beef meatballs', vietnamese: 'Bò viên', surcharge: 0, available: true },
      { id: 'ga', name: 'Poached chicken', vietnamese: 'Gà', surcharge: 0, available: true },
      { id: 'tofu', name: 'Fried tofu', vietnamese: 'Đậu hũ', surcharge: 0, note: 'Vegan', available: true },
      { id: 'trung', name: 'Soft egg', vietnamese: 'Trứng', surcharge: 1.5, addOn: true, available: true },
    ],
  },
  {
    id: 'garnish',
    title: 'Garnish',
    vietnamese: 'Rau & gia vị',
    instruction: 'As many as you like, all free. Herbs come from today’s basket.',
    choose: 'many',
    herbs: ['thai-basil', 'ngo-gai', 'mint', 'cilantro', 'bean-sprouts', 'lime', 'birds-eye-chilli'],
    options: [
      { id: 'hanh-phi', name: 'Fried shallots', vietnamese: 'Hành phi', surcharge: 0, default: true, available: true },
      { id: 'hanh-dam', name: 'Vinegar onions', vietnamese: 'Hành dấm', surcharge: 0, available: true },
      { id: 'sate', name: 'House satế chilli oil', vietnamese: 'Sa tế', surcharge: 0, note: 'Spicy', available: true },
    ],
  },
];

/** Herbs pre-selected in the builder (if they are in today's basket). */
export const defaultHerbs = ['thai-basil', 'bean-sprouts', 'lime'];
