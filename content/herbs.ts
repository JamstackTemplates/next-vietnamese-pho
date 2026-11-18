// Today's herb basket: the fresh herbs and garnishes that come with every bowl.
// Home ("Today's herb basket") and the Build a bowl page both read this list, and the bowl builder's
// garnish step refers to these herbs by `id` (see content/bowl.ts).
// Most frequent edit: set `inBasket: false` when an herb runs out or is out of season.

export interface Herb {
  /** Unique, URL-safe id. Also the key for its drawing in components/art/herbs.tsx. */
  id: string;
  /** English name. */
  name: string;
  /** Vietnamese name with diacritics. */
  vietnamese: string;
  /** One short handwritten note. */
  note: string;
  /** false shows "Not in today's basket" and disables it in the bowl builder. */
  inBasket: boolean;
}

export const herbs: Herb[] = [
  { id: 'thai-basil', name: 'Thai basil', vietnamese: 'Húng quế', note: 'Purple stems, aniseed bite', inBasket: true },
  { id: 'ngo-gai', name: 'Sawtooth herb', vietnamese: 'Ngò gai', note: 'Like cilantro, only louder', inBasket: true },
  { id: 'mint', name: 'Mint', vietnamese: 'Húng lủi', note: 'Tear it, don’t chop it', inBasket: true },
  { id: 'cilantro', name: 'Cilantro', vietnamese: 'Ngò', note: 'Stems and all', inBasket: true },
  { id: 'bean-sprouts', name: 'Bean sprouts', vietnamese: 'Giá', note: 'Raw for crunch, dunk to soften', inBasket: true },
  { id: 'lime', name: 'Lime', vietnamese: 'Chanh', note: 'Squeeze just before you sip', inBasket: true },
  { id: 'birds-eye-chilli', name: 'Bird’s-eye chilli', vietnamese: 'Ớt', note: 'One slice is plenty', inBasket: true },
];
