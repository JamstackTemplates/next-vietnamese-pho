// The menu board. /menu/, the three menu boards on Home and the structured data all read this file.
// Most frequent edits: mark a dish sold out (`available: false`), change a price, or add a dish to a
// section. Prices are US dollars. Plain strings only: text is rendered as text, never as HTML.

/** Dietary and allergen markers shown beside dishes, with their legend on /menu/. */
export type Tag = 'vegan' | 'vegetarian' | 'gluten-free' | 'spicy' | 'contains-peanut' | 'contains-fish-sauce';

export const TAGS: Record<Tag, { label: string }> = {
  vegan: { label: 'Vegan' },
  vegetarian: { label: 'Vegetarian' },
  'gluten-free': { label: 'Gluten-free' },
  spicy: { label: 'Spicy' },
  'contains-peanut': { label: 'Contains peanut' },
  'contains-fish-sauce': { label: 'Contains fish sauce' },
};

export interface MenuItem {
  /** Unique, URL-safe id across the whole menu, e.g. "pho-tai". */
  id: string;
  /** English name. */
  name: string;
  /** Vietnamese name with diacritics. */
  vietnamese: string;
  /** One or two short sentences. */
  description: string;
  /** Single price in USD. Use `sizes` instead for dishes served small or large. */
  price?: number;
  /** Small and large bowl prices in USD (phở). Replaces `price`. */
  sizes?: { small: number; large: number };
  tags: Tag[];
  /** false shows "Hết rồi · Sold out today". */
  available: boolean;
  /** The house favourite in its section: at most one per section. */
  signature?: boolean;
}

export interface MenuSection {
  /** URL-safe id, used as the page anchor (/menu/#pho). */
  id: string;
  /** English title on the board. */
  title: string;
  /** Vietnamese title. */
  vietnamese: string;
  /** Short line under the title. */
  intro: string;
  items: MenuItem[];
}

/** Items allowed a price of 0, shown as "Free". */
export const freeItems = new Set(['rau-thom']);

/** Highest believable price for a single dish; catches typos such as 155 for 15.50. */
export const MAX_PRICE = 40;

export const menu: MenuSection[] = [
  {
    id: 'pho',
    title: 'Phở',
    vietnamese: 'Phở',
    intro: 'Rice noodles in broth, with a plate of herbs, sprouts and lime. Small or large.',
    items: [
      { id: 'pho-dac-biet', name: 'House special', vietnamese: 'Phở đặc biệt', description: 'Rare steak, brisket, tendon and beef meatballs in the slow beef broth.', sizes: { small: 15.5, large: 18.5 }, tags: ['contains-fish-sauce'], available: true, signature: true },
      { id: 'pho-tai', name: 'Rare steak', vietnamese: 'Phở tái', description: 'Eye of round sliced thin and cooked by the broth at the table.', sizes: { small: 13.5, large: 16 }, tags: ['contains-fish-sauce'], available: true },
      { id: 'pho-chin', name: 'Brisket', vietnamese: 'Phở chín', description: 'Well-done brisket, sliced across the grain.', sizes: { small: 13.5, large: 16 }, tags: ['gluten-free', 'contains-fish-sauce'], available: true },
      { id: 'pho-ga', name: 'Chicken', vietnamese: 'Phở gà', description: 'Poached chicken in a clear ginger-chicken broth.', sizes: { small: 13, large: 15.5 }, tags: ['gluten-free', 'contains-fish-sauce'], available: true },
      { id: 'pho-chay', name: 'Mushroom & tofu', vietnamese: 'Phở chay', description: 'Charred-shiitake broth with fried tofu and bok choy.', sizes: { small: 12.5, large: 15 }, tags: ['vegan'], available: true },
    ],
  },
  {
    id: 'banh-mi',
    title: 'Bánh mì',
    vietnamese: 'Bánh mì',
    intro: 'Crackly rolls from the bakery two stalls down, with pickled carrot, daikon, cucumber and cilantro.',
    items: [
      { id: 'banh-mi-thit', name: 'Grilled pork', vietnamese: 'Bánh mì thịt nướng', description: 'Lemongrass pork off the grill, pâté and house mayo.', price: 10.5, tags: ['contains-fish-sauce'], available: true, signature: true },
      { id: 'banh-mi-ga', name: 'Five-spice chicken', vietnamese: 'Bánh mì gà', description: 'Chicken thigh roasted with five-spice and honey.', price: 10, tags: ['contains-fish-sauce'], available: true },
      { id: 'banh-mi-ca', name: 'Turmeric fish', vietnamese: 'Bánh mì chả cá', description: 'Turmeric and dill fish cakes with chilli mayo.', price: 11, tags: ['spicy', 'contains-fish-sauce'], available: true },
      { id: 'banh-mi-chay', name: 'Lemongrass tofu', vietnamese: 'Bánh mì chay', description: 'Crisp tofu tossed in lemongrass and soy.', price: 9.5, tags: ['vegan'], available: true },
      { id: 'banh-mi-op-la', name: 'Fried egg', vietnamese: 'Bánh mì ốp la', description: 'Two crispy-edged eggs, Maggi and black pepper.', price: 8.5, tags: ['vegetarian'], available: false },
    ],
  },
  {
    id: 'com-bun',
    title: 'Cơm & bún',
    vietnamese: 'Cơm & bún',
    intro: 'Broken rice and cool vermicelli plates, each with nước chấm and pickles.',
    items: [
      { id: 'com-tam', name: 'Broken-rice plate', vietnamese: 'Cơm tấm sườn', description: 'Grilled pork chop, steamed egg meatloaf and scallion oil.', price: 16, tags: ['contains-fish-sauce'], available: true, signature: true },
      { id: 'com-ga', name: 'Hainan-style chicken rice', vietnamese: 'Cơm gà', description: 'Poached chicken over rice cooked in its stock, with ginger sauce.', price: 15, tags: ['gluten-free', 'contains-fish-sauce'], available: true },
      { id: 'bun-cha-gio', name: 'Vermicelli with spring rolls', vietnamese: 'Bún chả giò', description: 'Cool noodles, herbs, crushed peanuts and crispy rolls.', price: 15.5, tags: ['contains-peanut', 'contains-fish-sauce'], available: true },
      { id: 'bun-bo-xao', name: 'Lemongrass beef vermicelli', vietnamese: 'Bún bò xào', description: 'Beef seared with lemongrass and chilli over vermicelli.', price: 16.5, tags: ['spicy', 'contains-peanut', 'contains-fish-sauce'], available: true },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    vietnamese: 'Món phụ',
    intro: 'For the table.',
    items: [
      { id: 'goi-cuon', name: 'Summer rolls (2)', vietnamese: 'Gỏi cuốn', description: 'Shrimp, pork, herbs and rice noodles with peanut-hoisin dip.', price: 7, tags: ['contains-peanut'], available: true },
      { id: 'cha-gio', name: 'Crispy spring rolls (3)', vietnamese: 'Chả giò', description: 'Pork and wood-ear mushroom, with lettuce to wrap.', price: 7.5, tags: ['contains-fish-sauce'], available: true },
      { id: 'rau-thom', name: 'Extra herb plate', vietnamese: 'Rau thơm', description: 'Ask as often as you like.', price: 0, tags: ['vegan'], available: true },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    vietnamese: 'Đồ uống',
    intro: 'Iced, mostly.',
    items: [
      { id: 'ca-phe-sua-da', name: 'Iced coffee with condensed milk', vietnamese: 'Cà phê sữa đá', description: 'Dark-roast coffee dripped through a phin over condensed milk and ice.', price: 5.5, tags: ['vegetarian'], available: true, signature: true },
      { id: 'tra-da', name: 'Iced jasmine tea', vietnamese: 'Trà đá', description: 'Refills on the house.', price: 2.5, tags: ['vegan'], available: true },
      { id: 'nuoc-chanh', name: 'Salted lime soda', vietnamese: 'Soda chanh muối', description: 'Preserved salted lime, sugar and soda water.', price: 5, tags: ['vegan'], available: true },
      { id: 'sinh-to-bo', name: 'Avocado smoothie', vietnamese: 'Sinh tố bơ', description: 'Avocado, condensed milk and ice, blended thick.', price: 6.5, tags: ['vegetarian'], available: true },
    ],
  },
];
