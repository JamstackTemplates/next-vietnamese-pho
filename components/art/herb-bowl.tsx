// The signature element: a green-and-gold rimmed porcelain phở bowl seen from above, beside its herb plate.
// Every broth, noodle, protein and garnish is its own layer, so the bowl builder can draw any bowl.
// Static uses (hero) pass `all={false}` to render only the chosen layers.
import { useId, type ReactNode } from 'react';
import { BOWL, C, GOLD_RIM, LINE, MELAMINE, MELAMINE_LIGHT, round, seeded } from './palette';
import { HerbBunch, HerbInBowl } from './herbs';

export interface BowlDrawing {
  broth: string;
  noodles: string;
  protein: readonly string[];
  garnish: readonly string[];
}

const CX = 230; const CY = 230;
const ink = { stroke: LINE, strokeWidth: 1.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

const BROTHS: Record<string, { fill: string; mid: string; edge: string; fat: string }> = {
  beef: { fill: '#c88138', mid: '#aa6626', edge: '#754116', fat: '#f4ca78' },
  chicken: { fill: '#ecc15a', mid: '#d8a63c', edge: '#a67a21', fat: '#fce8a4' },
  mushroom: { fill: '#825b3b', mid: '#68452a', edge: '#442b18', fat: '#d49d62' },
};

function Layer({ on, all, children, label }: { on: boolean; all: boolean; children: ReactNode; label?: string }) {
  if (!all && !on) return null;
  return <g className="layer" data-on={on} data-layer={label}>{children}</g>;
}

function noodleArcs(seed: number, count: number, rMin: number, rMax: number) {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => {
    const a = rand() * Math.PI * 2; const sweep = .75 + rand() * .95;
    const r1 = rMin + rand() * (rMax - rMin); const r2 = Math.min(rMax, Math.max(rMin, r1 + (rand() - .5) * 44));
    const mid = a + sweep / 2; const rc = (r1 + r2) / 2 + 22 + rand() * 18;
    const p = (ang: number, r: number) => `${round(CX + Math.cos(ang) * r)} ${round(CY + Math.sin(ang) * r)}`;
    return `M${p(a, r1)}Q${p(mid, rc)} ${p(a + sweep, r2)}`;
  });
}

function Noodles({ id }: { id: string }) {
  if (id === 'bun') {
    const rand = seeded(7);
    const coils = Array.from({ length: 28 }, () => {
      const a = rand() * Math.PI * 2; const r = 26 + rand() * 118;
      return { x: round(CX + Math.cos(a) * r), y: round(CY + Math.sin(a) * r), rx: round(10 + rand() * 9), ry: round(6 + rand() * 6), rot: round(rand() * 180) };
    });
    return <g>{coils.map((c, i) => <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.rot})`}>
      {[0, 3.5, 7].map(o => <ellipse key={o} rx={c.rx - o * .6} ry={c.ry - o * .3} cx={o * .5} fill="none" stroke={C.noodleEdge} strokeWidth={4.4} />)}
      {[0, 3.5, 7].map(o => <ellipse key={`f${o}`} rx={c.rx - o * .6} ry={c.ry - o * .3} cx={o * .5} fill="none" stroke={C.noodle} strokeWidth={2.6} />)}
    </g>)}</g>;
  }
  const spec = id === 'wide' ? { seed: 11, count: 13, w: 15 } : id === 'zucchini' ? { seed: 23, count: 15, w: 10 } : { seed: 3, count: 22, w: 8 };
  const edge = id === 'zucchini' ? C.zucchiniEdge : C.noodleEdge; const fill = id === 'zucchini' ? C.zucchini : C.noodle;
  const arcs = noodleArcs(spec.seed, spec.count, 30, 144);
  return <g fill="none" strokeLinecap="round">
    {arcs.map((d, i) => <path key={i} d={d} stroke={edge} strokeWidth={spec.w + 2.8} opacity={.9} />)}
    {arcs.map((d, i) => <path key={`f${i}`} d={d} stroke={fill} strokeWidth={spec.w} />)}
  </g>;
}

/** Where each protein sits in the bowl (angle in degrees, distance from centre). */
const SPOTS: Record<string, [number, number]> = { tai: [-52, 92], chin: [198, 90], 'bo-vien': [126, 92], ga: [24, 96], tofu: [270, 72], trung: [0, 0] };

function Protein({ id }: { id: string }) {
  const [deg, dist] = SPOTS[id] ?? [90, 80];
  const x = round(CX + Math.cos(deg * Math.PI / 180) * dist); const y = round(CY + Math.sin(deg * Math.PI / 180) * dist);
  const t = `translate(${x} ${y}) rotate(${deg + 90})`;
  switch (id) {
    case 'tai': return <g transform={t}>{[-24, -8, 8, 24].map((o, i) => <g key={i} transform={`translate(${o} ${i % 2 ? 3 : -3}) rotate(${o * .7})`}>
      <path d="M-13 -31C-4 -35 8 -33 13 -26L11 26C4 33 -6 33 -13 26Z" fill={C.rare} {...ink} />
      <path d="M-7 -20C-2 -8 -4 6 0 18M4 -22C6 -10 2 0 5 14" fill="none" stroke="#f5d2cf" strokeWidth={1.8} strokeLinecap="round" opacity={.85} />
      <path d="M11 -26L9 26" stroke={C.rareEdge} strokeWidth={3.4} strokeLinecap="round" />
    </g>)}</g>;
    case 'chin': return <g transform={t}>{[-22, -7, 8, 23].map((o, i) => <g key={i} transform={`translate(${o} 0) rotate(${-o * .5})`}>
      <rect x={-11} y={-27} width={22} height={54} rx={6} fill={C.brisket} {...ink} />
      <path d="M-8 -26V26" stroke={C.fat} strokeWidth={4.5} strokeLinecap="round" />
      <path d="M2 -16L4 -6M0 4L3 15" stroke="#643b28" strokeWidth={1.5} strokeLinecap="round" />
    </g>)}</g>;
    case 'bo-vien': return <g transform={t}>{[[-26, 4], [-6, -12], [14, 6], [30, -10]].map(([ox, oy], i) => <g key={i} transform={`translate(${ox} ${oy})`}>
      <circle r={16.5} fill={C.meatball} {...ink} /><circle r={11.5} fill={C.meatballCut} />
      {[[-4, -3], [3, 2], [-1, 5], [5, -4], [-6, 4]].map(([a, b], j) => <circle key={j} cx={a} cy={b} r={1.3} fill="#533120" />)}
      <path d="M-7 -6C-3 -10 3 -10 7 -6" fill="none" stroke="#c89a7c" strokeWidth={1.6} strokeLinecap="round" opacity={.55} />
    </g>)}</g>;
    case 'ga': return <g transform={t}>{[-28, -14, 0, 14, 28].map((o, i) => <g key={i} transform={`translate(${o} ${i % 2 ? 4 : -4}) rotate(${-8 + i * 4})`}>
      <rect x={-6.5} y={-25} width={13} height={50} rx={5.5} fill={C.chicken} {...ink} />
      <path d="M5 -22V22" stroke={C.chickenSkin} strokeWidth={3.2} strokeLinecap="round" />
    </g>)}</g>;
    case 'tofu': return <g transform={t}>{[[-30, 0, 12], [-8, -8, -8], [14, 2, 20], [34, -6, -4], [4, 18, 30]].map(([ox, oy, r], i) => <g key={i} transform={`translate(${ox} ${oy}) rotate(${r})`}>
      <rect x={-11.5} y={-11.5} width={23} height={23} rx={4.5} fill={C.tofu} {...ink} /><rect x={-6.5} y={-6.5} width={13} height={13} rx={2.5} fill={C.tofuFace} />
    </g>)}</g>;
    case 'trung': return <g transform={`translate(${CX + 6} ${CY + 4}) rotate(-20)`}>
      <path d="M-30 0C-30 -20 30 -20 30 0C30 22 -30 22 -30 0Z" fill={C.eggWhite} {...ink} />
      <circle cx={2} cy={1} r={13.5} fill={C.yolk} stroke="#c47d0c" strokeWidth={1.4} />
      <ellipse cx={-3} cy={-4} rx={4.2} ry={2.5} fill="#fff" opacity={.7} />
    </g>;
    default: return <g transform={t}><circle r={18} fill={C.brisket} {...ink} /></g>;
  }
}

function Extra({ id }: { id: string }) {
  if (id === 'hanh-phi') {
    const rand = seeded(41);
    return <g fill="none" stroke={C.shallot} strokeWidth={3} strokeLinecap="round">{Array.from({ length: 24 }, (_, i) => {
      const a = rand() * Math.PI * 2; const r = 20 + rand() * 120; const x = CX + Math.cos(a) * r; const y = CY + Math.sin(a) * r; const k = rand() * 6;
      return <path key={i} d={`M${round(x)} ${round(y)}q${round(3 + k)} ${round(-5 - k / 2)} ${round(8 + k)} 0`} />;
    })}</g>;
  }
  if (id === 'hanh-dam') {
    return <g fill="none">{[[-70, -40, 16], [-56, 60, 13], [40, 10, 14], [100, 70, 12], [-20, -96, 13], [-100, 30, 11]].map(([x, y, r], i) => <g key={i}>
      <ellipse cx={CX + x} cy={CY + y} rx={r} ry={r * .8} stroke={LINE} strokeWidth={4.2} strokeOpacity={.55} />
      <ellipse cx={CX + x} cy={CY + y} rx={r} ry={r * .8} stroke={C.onion} strokeWidth={2.6} />
    </g>)}</g>;
  }
  if (id === 'sate') {
    const rand = seeded(97);
    return <g fill={C.sate}>{Array.from({ length: 18 }, (_, i) => {
      const a = rand() * Math.PI * 2; const r = 28 + rand() * 122;
      return <circle key={i} cx={round(CX + Math.cos(a) * r)} cy={round(CY + Math.sin(a) * r)} r={round(2.5 + rand() * 5)} opacity={.85} />;
    })}<path d={`M${CX - 30} ${CY - 70}c20 -14 46 -10 58 6`} fill="none" stroke={C.sate} strokeWidth={4} strokeLinecap="round" opacity={.72} /></g>;
  }
  return null;
}

/** Scallion rings & delicate onion threads: part of every bowl. */
function Scallions() {
  const rand = seeded(5);
  return <g>{Array.from({ length: 24 }, (_, i) => {
    const a = rand() * Math.PI * 2; const r = 18 + rand() * 134;
    return <circle key={i} cx={round(CX + Math.cos(a) * r)} cy={round(CY + Math.sin(a) * r)} r={4.3} fill={C.scallionFill} stroke={C.scallion} strokeWidth={2.1} />;
  })}</g>;
}

export const BROTH_IDS = Object.keys(BROTHS);
export const NOODLE_IDS = ['banh-pho', 'wide', 'bun', 'zucchini'];
export const PROTEIN_IDS = Object.keys(SPOTS);
export const EXTRA_IDS = ['hanh-phi', 'hanh-dam', 'sate'];

/** The bowl itself, in a 460 × 460 box, with porcelain glaze, lotus border and shaded broth. */
export function BowlGroup({ bowl, all = false, herbIds }: { bowl: BowlDrawing; all?: boolean; herbIds: readonly string[] }) {
  const uid = useId().replace(/:/g, '');
  const extraProteins = bowl.protein.filter(id => !PROTEIN_IDS.includes(id));
  return <g>
    <defs>
      {BROTH_IDS.map(id => <radialGradient key={id} id={`${uid}-b-${id}`} cx="42%" cy="38%" r="64%">
        <stop offset="0%" stopColor={BROTHS[id].fill} />
        <stop offset="68%" stopColor={BROTHS[id].mid} />
        <stop offset="100%" stopColor={BROTHS[id].edge} />
      </radialGradient>)}
      <radialGradient id={`${uid}-well`} cx="50%" cy="50%" r="50%">
        <stop offset="72%" stopColor="#efe6ce" />
        <stop offset="100%" stopColor="#d2c39f" />
      </radialGradient>
    </defs>
    <circle cx={CX + 10} cy={CY + 16} r={214} fill="#140c06" opacity={.28} />
    <circle cx={CX} cy={CY} r={211} fill={BOWL} {...ink} strokeWidth={2.4} />
    <circle cx={CX} cy={CY} r={198} fill="none" stroke={MELAMINE} strokeWidth={16} />
    <circle cx={CX} cy={CY} r={203} fill="none" stroke={MELAMINE_LIGHT} strokeWidth={2.5} opacity={.65} />
    <circle cx={CX} cy={CY} r={198} fill="none" stroke="#f7f1dd" strokeWidth={4} strokeDasharray="2.2 10.5" strokeLinecap="round" />
    <circle cx={CX} cy={CY} r={188} fill="none" stroke={GOLD_RIM} strokeWidth={2} />
    <circle cx={CX} cy={CY} r={185} fill={BOWL} stroke={LINE} strokeWidth={1.1} strokeOpacity={.45} />
    <circle cx={CX} cy={CY} r={178} fill={`url(#${uid}-well)`} />
    {BROTH_IDS.map(id => <Layer key={id} on={(BROTHS[bowl.broth] ? bowl.broth : 'beef') === id} all={all} label={`broth-${id}`}>
      <circle cx={CX} cy={CY} r={168} fill={`url(#${uid}-b-${id})`} stroke={BROTHS[id].edge} strokeWidth={3} />
      <ellipse cx={CX - 44} cy={CY - 64} rx={104} ry={34} transform={`rotate(-28 ${CX - 44} ${CY - 64})`} fill="#fff8e8" opacity={.14} />
      {[[-90, -20, 6.5], [60, -110, 5.5], [110, 40, 7.5], [-40, 120, 5], [20, -40, 4.5], [-120, 70, 4], [80, 110, 5.5], [-60, -120, 4.5], [-10, -135, 3.5], [126, -32, 4]].map(([x, y, r], i) =>
        <g key={i}>
          <circle cx={CX + x} cy={CY + y} r={r} fill={BROTHS[id].fat} opacity={.78} />
          <circle cx={CX + x - r * .28} cy={CY + y - r * .28} r={r * .3} fill="#fff" opacity={.45} />
        </g>)}
    </Layer>)}
    {NOODLE_IDS.map(id => <Layer key={id} on={bowl.noodles === id} all={all} label={`noodles-${id}`}><Noodles id={id} /></Layer>)}
    <Scallions />
    {PROTEIN_IDS.map(id => <Layer key={id} on={bowl.protein.includes(id)} all={all} label={`protein-${id}`}><Protein id={id} /></Layer>)}
    {extraProteins.map(id => <Layer key={id} on all={all}><Protein id={id} /></Layer>)}
    {EXTRA_IDS.map(id => <Layer key={id} on={bowl.garnish.includes(id)} all={all} label={`garnish-${id}`}><Extra id={id} /></Layer>)}
    {herbIds.map(id => <Layer key={id} on={bowl.garnish.includes(id)} all={all} label={`herb-${id}`}><HerbInBowl id={id} cx={CX} cy={CY} /></Layer>)}
  </g>;
}

const PLATE_SPOTS: [number, number, number][] = [[-42, -40, -10], [26, -50, 20], [-56, 18, 30], [8, -2, -20], [50, 26, 10], [-12, 52, -30], [44, 72, 0]];

/** The herb plate, centred at (cx, cy). Herbs not yet in the bowl stay here. */
export function PlateGroup({ cx, cy, herbIds, onPlate, all = false }: { cx: number; cy: number; herbIds: readonly string[]; onPlate: (id: string) => boolean; all?: boolean }) {
  return <g>
    <ellipse cx={cx + 7} cy={cy + 12} rx={113} ry={111} fill="#140c06" opacity={.26} />
    <circle cx={cx} cy={cy} r={111} fill={BOWL} {...ink} strokeWidth={2.2} />
    <circle cx={cx} cy={cy} r={100} fill="none" stroke={MELAMINE} strokeWidth={4} />
    <circle cx={cx} cy={cy} r={93} fill="none" stroke={GOLD_RIM} strokeWidth={1.6} />
    <circle cx={cx} cy={cy} r={88} fill="#ede4cc" opacity={.35} />
    {herbIds.map((id, i) => {
      const [x, y, r] = PLATE_SPOTS[i % PLATE_SPOTS.length];
      return <Layer key={id} on={onPlate(id)} all={all} label={`plate-${id}`}>
        <g transform={`translate(${cx + x} ${cy + y}) rotate(${r})`}><HerbBunch id={id} /></g>
      </Layer>;
    })}
  </g>;
}

/** Three layered curls of aromatic steam rising from (x, y). Animated in CSS; still under reduced motion. */
export function Steam({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const uid = useId().replace(/:/g, '');
  return <g className="steam no-print" transform={`translate(${x} ${y}) scale(${scale})`} fill="none" strokeLinecap="round">
    <defs>
      <filter id={`${uid}-blur`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
    </defs>
    <g filter={`url(#${uid}-blur)`} stroke="#fff7e2" strokeWidth={13} opacity={.45}>
      <path d="M-54 6C-74 -26 -30 -50 -52 -82S-38 -134 -60 -158" />
      <path d="M0 -8C-22 -42 22 -64 -2 -96S12 -144 -10 -174" />
      <path d="M54 6C34 -26 74 -50 52 -82S64 -134 42 -158" />
    </g>
    <g stroke="#fffdf7" strokeWidth={4.5} opacity={.65}>
      <path d="M-54 6C-74 -26 -30 -50 -52 -82S-38 -134 -60 -158" />
      <path d="M0 -8C-22 -42 22 -64 -2 -96S12 -144 -10 -174" />
      <path d="M54 6C34 -26 74 -50 52 -82S64 -134 42 -158" />
    </g>
  </g>;
}

/** Bamboo chopsticks with lacquer tips and a ceramic soup spoon resting beside the bowl. */
export function Utensils({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <g opacity={.2} transform="translate(4 6)">
      <path d="M0 -6L210 -14L210 -8L0 2Z" fill="#140c06" />
      <path d="M0 10L208 6L208 12L0 18Z" fill="#140c06" />
    </g>
    <g {...ink}>
      <path d="M0 -6L210 -14L210 -8L0 2Z" fill={C.bamboo} />
      <path d="M0 10L208 6L208 12L0 18Z" fill={C.bamboo} />
    </g>
    <path d="M168 -13L210 -14L210 -8L168 -7ZM166 6L208 6L208 12L166 13Z" fill={C.stool} />
    <path d="M168 -13V-7M166 6V13" stroke={GOLD_RIM} strokeWidth={2} />
    <g transform="translate(40 58) rotate(-8)">
      <path d="M3 4C3 -16 57 -18 61 4C57 26 3 24 3 4Z" fill="#140c06" opacity={.18} />
      <path d="M0 0C0 -20 54 -22 58 0C54 22 0 20 0 0Z" fill={BOWL} {...ink} />
      <path d="M6 0C8 -12 46 -13 50 0C46 13 8 12 6 0Z" fill="none" stroke={MELAMINE} strokeWidth={2.2} />
      <path d="M56 -4L118 -10C124 -10 124 2 118 2L56 4Z" fill={BOWL} {...ink} />
    </g>
  </g>;
}

/** Little ceramic sauce dish with hoisin and house chili-satế side by side, from above. */
export function SauceDish({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={4} cy={7} r={37} fill="#140c06" opacity={.22} />
    <circle r={37} fill={BOWL} {...ink} />
    <circle r={30} fill="none" stroke={MELAMINE} strokeWidth={2.5} />
    <path d="M-2 -20C-16 -18 -22 -4 -16 8C-10 18 2 18 0 6C-2 -4 8 -8 10 -14C12 -20 6 -21 -2 -20Z" fill={C.hoisin} stroke={LINE} strokeWidth={1.2} />
    <path d="M2 20C16 18 22 4 16 -8C10 -18 -2 -18 0 -6C2 4 -8 8 -10 14C-12 20 -6 21 2 20Z" fill={C.sate} stroke={LINE} strokeWidth={1.2} />
    <ellipse cx={-10} cy={-10} rx={4} ry={2.2} fill="#fff" opacity={.35} /><ellipse cx={9} cy={8} rx={4} ry={2.2} fill="#fff" opacity={.35} />
    <circle cx={8} cy={14} r={1.3} fill={C.seed} /><circle cx={14} cy={2} r={1.1} fill={C.seed} />
  </g>;
}

/** Bowl and plate as a standalone drawing (viewBox 0 0 680 470). */
export function HerbBowl({ bowl, herbIds, all = false, onPlate, steam = false, title, className = '' }: {
  bowl: BowlDrawing; herbIds: readonly string[]; all?: boolean; onPlate?: (id: string) => boolean; steam?: boolean; title: string; className?: string;
}) {
  const plate = onPlate ?? ((id: string) => !bowl.garnish.includes(id));
  return <svg viewBox="0 0 680 470" role="img" aria-label={title} className={`overflow-visible ${className}`}>
    <PlateGroup cx={560} cy={330} herbIds={herbIds} onPlate={plate} all={all} />
    <BowlGroup bowl={bowl} herbIds={herbIds} all={all} />
    <Utensils x={455} y={58} r={8} />
    <SauceDish x={612} y={176} s={.92} />
    {steam ? <Steam x={CX} y={CY - 40} /> : null}
  </svg>;
}
