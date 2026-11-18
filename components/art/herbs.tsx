// Herb drawings: small leaf primitives (used in the bowl, plate and hero) and the larger botanical
// drawings for "Today's herb basket". Flat fills, one ink line, slightly rounded joins.
import type { ReactNode } from 'react';
import { C, LINE } from './palette';

type Place = { x: number; y: number; r?: number; s?: number };
const at = ({ x, y, r = 0, s = 1 }: Place) => `translate(${x} ${y}) rotate(${r}) scale(${s})`;
const ink = { stroke: LINE, strokeWidth: 1.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

/** Basil leaf pointing right from its stem end, ~30 long. */
export function BasilLeaf(p: Place) {
  return <g transform={at(p)}>
    <path d="M0 0C7 -10 22 -10 30 0C22 9 7 9 0 0Z" fill={C.basil} {...ink} />
    <path d="M2 0H26M10 0l5 -4M10 0l5 4M18 0l4 -3M18 0l4 3" fill="none" stroke={C.basilDark} strokeWidth={1.1} strokeLinecap="round" />
  </g>;
}

/** Sawtooth herb (ngò gai): a long serrated leaf, ~46 long. */
export function SawLeaf(p: Place) {
  const top: string[] = []; const bottom: string[] = [];
  for (let i = 1; i <= 8; i++) {
    const x = i * 5.4; const w = Math.sin((i / 9) * Math.PI) * 7;
    top.push(`L${x - 2.7} ${-w * .75} L${x} ${-w}`);
    bottom.unshift(`L${x} ${w} L${x - 2.7} ${w * .75}`);
  }
  return <g transform={at(p)}>
    <path d={`M0 0 ${top.join(' ')} L46 0 ${bottom.join(' ')} Z`} fill={C.saw} {...ink} />
    <path d="M2 0H42" stroke={C.basilDark} strokeWidth={1.1} strokeLinecap="round" />
  </g>;
}

/** Mint leaf: rounded, veined, ~24 long. */
export function MintLeaf(p: Place) {
  return <g transform={at(p)}>
    <path d="M0 0C2 -11 18 -13 24 0C18 13 2 11 0 0Z" fill={C.mint} {...ink} />
    <path d="M2 0H21M8 0l3 -6M8 0l3 6M14 0l3 -5M14 0l3 5" fill="none" stroke={C.mintVein} strokeWidth={1} strokeLinecap="round" />
  </g>;
}

/** Cilantro sprig leaf: three rounded, notched lobes on a short stem. */
export function CilantroLeaf(p: Place) {
  return <g transform={at(p)}>
    <path d="M0 0H8" stroke={C.cilantro} strokeWidth={2} strokeLinecap="round" />
    <path d="M8 0C6 -10 14 -14 18 -8C24 -12 30 -4 25 0C30 4 24 12 18 8C14 14 6 10 8 0Z" fill={C.cilantro} {...ink} />
    <path d="M9 0L18 -6M9 0H23M9 0L18 6" stroke="#2f7a32" strokeWidth={1} strokeLinecap="round" />
  </g>;
}

/** Bean sprout: a pale curved shoot with a yellow-green head, ~32 long. */
export function Sprout(p: Place) {
  return <g transform={at(p)}>
    <path d="M0 0C9 -9 22 -9 32 -2" fill="none" stroke={LINE} strokeWidth={5.2} strokeLinecap="round" />
    <path d="M0 0C9 -9 22 -9 32 -2" fill="none" stroke={C.sprout} strokeWidth={3.2} strokeLinecap="round" />
    <ellipse cx={-1} cy={1} rx={4.2} ry={3.2} fill={C.sproutHead} {...ink} strokeWidth={1.2} />
  </g>;
}

/** Lime wedge seen from above: a half disc with segments. */
export function LimeWedge(p: Place) {
  return <g transform={at(p)}>
    <path d="M-18 0A18 18 0 0 1 18 0Z" fill={C.lime} {...ink} />
    <path d="M-14 0A14 14 0 0 1 14 0Z" fill={C.limeFlesh} />
    <path d="M0 0L-10 -10M0 0V-13M0 0L10 -10" stroke={C.lime} strokeWidth={1.4} strokeLinecap="round" />
  </g>;
}

/** Bird's-eye chilli slice: a red ring with seeds. */
export function ChilliSlice(p: Place) {
  return <g transform={at(p)}>
    <circle r={6} fill={C.chilli} {...ink} strokeWidth={1.2} />
    <circle r={3.4} fill={C.seed} />
    <circle cx={-1.2} cy={-.6} r={.9} fill={C.chilli} /><circle cx={1.3} cy={.8} r={.9} fill={C.chilli} />
  </g>;
}

/** Whole bird's-eye chilli, ~34 long. */
export function Chilli(p: Place) {
  return <g transform={at(p)}>
    <path d="M6 0C12 -6 26 -5 34 2C24 4 12 5 6 0Z" fill={C.chilli} {...ink} />
    <path d="M0 -1C2 -3 5 -3 7 0C5 2 2 2 0 -1Z" fill={C.chilliCap} {...ink} strokeWidth={1.2} />
    <path d="M1 -1C-3 -3 -6 -1 -8 -4" fill="none" stroke={C.chilliCap} strokeWidth={2} strokeLinecap="round" />
    <path d="M12 -2C18 -4 24 -3 28 0" fill="none" stroke="#fff" strokeOpacity={.45} strokeWidth={1.4} strokeLinecap="round" />
  </g>;
}

/* ---------- Larger botanical drawings for the herb basket (viewBox 0 0 160 160) ---------- */

function Sprig({ children, title }: { children: ReactNode; title: string }) {
  return <svg viewBox="0 0 160 160" role="img" aria-label={title} className="h-full w-full overflow-visible">{children}</svg>;
}

const drawings: Record<string, (title: string) => ReactNode> = {
  'thai-basil': title => <Sprig title={title}>
    <path d="M80 152C78 120 82 80 80 28" fill="none" stroke={C.basilStem} strokeWidth={4} strokeLinecap="round" />
    <path d="M80 152C78 120 82 80 80 28" fill="none" stroke={LINE} strokeWidth={1} strokeOpacity={.5} />
    {[[80, 132, -150, 1.5], [80, 128, -30, 1.5], [81, 104, -160, 1.35], [81, 100, -20, 1.35], [80, 78, -150, 1.15], [80, 74, -32, 1.15], [80, 54, -140, .9], [80, 52, -40, .9]]
      .map(([x, y, r, s], i) => <BasilLeaf key={i} x={x} y={y} r={r} s={s} />)}
    {[0, 1, 2, 3, 4].map(i => <g key={i}><circle cx={80 + (i % 2 ? 4 : -4)} cy={30 - i * 5} r={3.4} fill="#9c5aa8" stroke={LINE} strokeWidth={1} /></g>)}
  </Sprig>,
  'ngo-gai': title => <Sprig title={title}>
    <SawLeaf x={80} y={140} r={-100} s={2.3} /><SawLeaf x={78} y={140} r={-135} s={2} /><SawLeaf x={82} y={140} r={-55} s={2.05} />
    <circle cx={80} cy={140} r={6} fill={C.basilDark} stroke={LINE} strokeWidth={1.4} />
  </Sprig>,
  mint: title => <Sprig title={title}>
    <path d="M78 154C80 120 78 70 82 30" fill="none" stroke="#4a8f3d" strokeWidth={4} strokeLinecap="round" />
    {[[79, 128, -165, 1.75], [79, 124, -15, 1.75], [80, 98, -160, 1.55], [80, 94, -20, 1.55], [81, 68, -150, 1.3], [81, 64, -30, 1.3], [82, 40, -120, 1], [82, 38, -60, 1]]
      .map(([x, y, r, s], i) => <MintLeaf key={i} x={x} y={y} r={r} s={s} />)}
  </Sprig>,
  cilantro: title => <Sprig title={title}>
    <path d="M80 154C80 120 78 96 80 80M80 104C70 86 56 74 46 62M80 96C92 80 104 64 116 54M80 82C80 66 82 48 80 30" fill="none" stroke="#5aa34e" strokeWidth={3} strokeLinecap="round" />
    <CilantroLeaf x={44} y={62} r={-140} s={1.7} /><CilantroLeaf x={116} y={54} r={-40} s={1.7} /><CilantroLeaf x={80} y={34} r={-90} s={1.8} />
    <CilantroLeaf x={66} y={86} r={-160} s={1.3} /><CilantroLeaf x={96} y={78} r={-20} s={1.3} />
  </Sprig>,
  'bean-sprouts': title => <Sprig title={title}>
    {[[34, 110, -20, 2], [48, 86, 10, 2.1], [60, 122, -35, 1.9], [72, 96, 5, 2.2], [88, 118, -15, 2], [94, 80, 20, 1.9], [40, 70, -5, 1.8]]
      .map(([x, y, r, s], i) => <Sprout key={i} x={x} y={y} r={r} s={s} />)}
  </Sprig>,
  lime: title => <Sprig title={title}>
    <circle cx={64} cy={86} r={40} fill={C.lime} stroke={LINE} strokeWidth={2} />
    <path d="M44 66C52 58 64 56 74 60" fill="none" stroke="#fff" strokeOpacity={.5} strokeWidth={4} strokeLinecap="round" />
    <circle cx={98} cy={52} r={3} fill="#6e9a2a" />
    <LimeWedge x={112} y={130} r={-15} s={2} />
  </Sprig>,
  'birds-eye-chilli': title => <Sprig title={title}>
    <Chilli x={34} y={70} r={-12} s={2.6} /><Chilli x={40} y={100} r={8} s={2.4} />
    <ChilliSlice x={70} y={136} s={1.9} /><ChilliSlice x={104} y={128} s={1.7} /><ChilliSlice x={130} y={140} s={1.5} />
  </Sprig>,
};

/** Botanical drawing for an herb id from content/herbs.ts. Unknown ids get a basil sprig. */
export function HerbArt({ id, title }: { id: string; title: string }) {
  return <>{(drawings[id] ?? drawings['thai-basil'])(title)}</>;
}

/** A small bunch of an herb for the herb plate, centred on the origin (~70 across). */
export function HerbBunch({ id }: { id: string }) {
  switch (id) {
    case 'thai-basil': return <g><path d="M-20 18C-6 6 6 -6 18 -20" stroke={C.basilStem} strokeWidth={3} strokeLinecap="round" />
      <BasilLeaf x={-14} y={12} r={-120} s={1.1} /><BasilLeaf x={-12} y={10} r={10} s={1.1} /><BasilLeaf x={0} y={0} r={-110} s={1} /><BasilLeaf x={2} y={-2} r={-10} s={1} /><BasilLeaf x={14} y={-14} r={-60} s={.9} /></g>;
    case 'ngo-gai': return <g><SawLeaf x={-26} y={10} r={-15} s={1.1} /><SawLeaf x={-24} y={-4} r={-5} s={1.05} /><SawLeaf x={-20} y={20} r={-28} s={.95} /></g>;
    case 'mint': return <g><MintLeaf x={-20} y={0} r={-30} s={1.1} /><MintLeaf x={-4} y={8} r={20} s={1.1} /><MintLeaf x={0} y={-6} r={-70} s={1} /><MintLeaf x={-14} y={14} r={60} s={.9} /><MintLeaf x={6} y={4} r={-10} s={.95} /></g>;
    case 'cilantro': return <g><CilantroLeaf x={-20} y={8} r={-30} s={1.1} /><CilantroLeaf x={-8} y={-4} r={-80} s={1} /><CilantroLeaf x={0} y={10} r={10} s={1.05} /><CilantroLeaf x={-22} y={-8} r={-120} s={.9} /></g>;
    case 'bean-sprouts': return <g>{[[-22, 6, -10], [-18, -6, 15], [-10, 14, -25], [-6, 0, 5], [2, 12, -15], [-26, 16, 20], [-4, -10, 30]].map(([x, y, r], i) => <Sprout key={i} x={x} y={y} r={r} s={1.05} />)}</g>;
    case 'lime': return <g><LimeWedge x={-8} y={4} r={-20} s={1.1} /><LimeWedge x={10} y={8} r={25} s={1.1} /></g>;
    case 'birds-eye-chilli': return <g><Chilli x={-16} y={-2} r={-10} s={1} /><ChilliSlice x={-6} y={14} /><ChilliSlice x={8} y={12} /></g>;
    default: return <g><BasilLeaf x={-14} y={0} s={1.1} /></g>;
  }
}

/** The herb scattered on top of the broth, around a bowl centred at (cx, cy). */
export function HerbInBowl({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  const o = (x: number, y: number) => ({ x: cx + x, y: cy + y });
  switch (id) {
    case 'thai-basil': return <g><BasilLeaf {...o(70, -120)} r={-30} s={1.3} /><BasilLeaf {...o(96, -108)} r={-120} s={1.2} /><BasilLeaf {...o(-130, 20)} r={60} s={1.25} /></g>;
    case 'ngo-gai': return <g><SawLeaf {...o(-120, -60)} r={-20} s={1.2} /><SawLeaf {...o(20, 112)} r={-160} s={1.1} /></g>;
    case 'mint': return <g><MintLeaf {...o(-40, -128)} r={-10} s={1.3} /><MintLeaf {...o(-20, -118)} r={-80} s={1.2} /><MintLeaf {...o(118, 40)} r={150} s={1.2} /></g>;
    case 'cilantro': return <g><CilantroLeaf {...o(-30, 30)} r={-60} s={1.2} /><CilantroLeaf {...o(40, -20)} r={30} s={1.1} /><CilantroLeaf {...o(-80, 100)} r={-20} s={1.1} /></g>;
    case 'bean-sprouts': return <g>{[[50, 60, -20], [64, 70, 10], [44, 82, -40], [70, 54, 30], [58, 92, -5]].map(([x, y, r], i) => <Sprout key={i} {...o(x, y)} r={r} s={1.2} />)}</g>;
    case 'lime': return <LimeWedge {...o(118, -100)} r={-135} s={1.35} />;
    case 'birds-eye-chilli': return <g>{[[10, -60], [-60, -20], [90, -30], [-10, 70], [30, 30]].map(([x, y], i) => <ChilliSlice key={i} {...o(x, y)} s={1.1} />)}</g>;
    default: return null;
  }
}
