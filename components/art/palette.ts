// Food and object colours for the artwork. Food keeps its rich colour in both themes; outlines,
// bowls, boards and surfaces come from theme tokens in app/tailwind.input.css.
export const LINE = 'var(--art-line)';
export const BOWL = 'var(--bowl)';
export const MELAMINE = '#1d6b3e';
export const MELAMINE_LIGHT = '#2e8853';
export const GOLD_RIM = '#d49e43';
export const C = {
  basil: '#36843b', basilDark: '#235e28', basilStem: '#7c3c88',
  saw: '#489639', mint: '#5bb056', mintVein: '#347d31', cilantro: '#459642',
  sprout: '#f7f1db', sproutHead: '#c6d672',
  lime: '#89ba2f', limeFlesh: '#dceca0', chilli: '#cf2f25', chilliCap: '#398435', seed: '#f7dba8',
  noodle: '#faf3df', noodleEdge: '#d6c69c', zucchini: '#a6cd68', zucchiniEdge: '#4b8632',
  rare: '#c9545b', rareEdge: '#8a3531', brisket: '#8b5739', fat: '#efd9b8', meatball: '#6c432d', meatballCut: '#9c6b4e',
  chicken: '#f3e5c8', chickenSkin: '#dfb163', tofu: '#e3a542', tofuFace: '#f7da96', eggWhite: '#fffaf0', yolk: '#f2a21b',
  shallot: '#98571e', onion: '#f1e7ef', scallion: '#479438', scallionFill: '#c7e594', sate: '#cf3f28',
  crust: '#d89d4e', crustDark: '#9e5d22', carrot: '#ef8629', daikon: '#f5f2e8', cucumber: '#84be61', pork: '#a3512a',
  rice: '#fcf9f1', coffee: '#351f12', milk: '#ebd5ac', steel: '#cdd3cf', steelDark: '#8b948e', stool: '#cf3428', stoolDark: '#98231a',
  bamboo: '#d9b168', hoisin: '#472619', sriracha: '#c93227', fishSauce: '#c48324', glass: '#e6efe9',
  anise: '#63361c', aniseHighlight: '#9c5d33', cinnamon: '#7d4525', ginger: '#e6c67e',
} as const;

/** Deterministic pseudo-random numbers so the artwork renders identically on server and client. */
export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export const round = (value: number) => Math.round(value * 10) / 10;
