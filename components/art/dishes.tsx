// Dish vignettes (side and three-quarter views) for page heads and menu sections, plus the
// Contact tiffin stack and the 404 empty bowl. Warm, appetizing fills with clean ink lines.
import { useId } from 'react';
import { BOWL, C, GOLD_RIM, LINE, MELAMINE } from './palette';
import { BasilLeaf, ChilliSlice, CilantroLeaf, LimeWedge, MintLeaf, Sprout } from './herbs';

const ink = { stroke: LINE, strokeWidth: 2, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
type Art = { className?: string; title?: string };
const a11y = (title?: string) => title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const };

/** Phở bowl from the side, noodles lifted on bamboo chopsticks, steam rising. */
export function PhoSide({ className = '', title }: Art) {
  const uid = useId().replace(/:/g, '');
  return <svg viewBox="0 0 240 200" className={className} {...a11y(title)}>
    <defs>
      <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d8923e" /><stop offset="100%" stopColor="#94551d" />
      </linearGradient>
    </defs>
    <g className="steam no-print" fill="none" stroke="var(--muted)" strokeOpacity={.45} strokeWidth={4} strokeLinecap="round">
      <path d="M88 70C78 54 98 46 88 30" /><path d="M120 64C110 48 130 40 120 22" /><path d="M152 70C142 54 162 46 152 30" />
    </g>
    <ellipse cx={120} cy={186} rx={74} ry={8} fill="#140c06" opacity={.18} />
    <path d="M24 96H216C214 142 176 172 120 172C64 172 26 142 24 96Z" fill={BOWL} {...ink} />
    <path d="M30 116H210" stroke={MELAMINE} strokeWidth={11} />
    <path d="M34 123H206" stroke={GOLD_RIM} strokeWidth={2} />
    <path d="M36 116H204" stroke="#f7f1dd" strokeWidth={2.4} strokeDasharray="2 8" strokeLinecap="round" />
    <path d="M96 172H144L140 184H100Z" fill={BOWL} {...ink} />
    <ellipse cx={120} cy={96} rx={96} ry={14} fill={`url(#${uid}-b)`} {...ink} />
    <BasilLeaf x={48} y={92} r={-20} s={1.15} /><Sprout x={148} y={96} r={-10} /><LimeWedge x={190} y={94} r={-170} s={.95} /><ChilliSlice x={78} y={95} s={.9} />
    <path d="M118 96C112 70 128 58 124 30M130 96C126 72 140 60 136 34M110 94C104 74 116 64 112 38" fill="none" stroke={C.noodleEdge} strokeWidth={6} strokeLinecap="round" />
    <path d="M118 96C112 70 128 58 124 30M130 96C126 72 140 60 136 34M110 94C104 74 116 64 112 38" fill="none" stroke={C.noodle} strokeWidth={4} strokeLinecap="round" />
    <path d="M150 6L112 40M162 10L128 42" stroke={C.bamboo} strokeWidth={6} strokeLinecap="round" />
    <path d="M150 6L112 40M162 10L128 42" stroke={LINE} strokeWidth={1.2} strokeOpacity={.6} strokeLinecap="round" />
  </svg>;
}

/** A flaky Vietnamese bánh mì split open to show grilled pork, đồ chua pickles, cucumber, cilantro & chili. */
export function BanhMiArt({ className = '', title }: Art) {
  return <svg viewBox="0 0 260 150" className={className} {...a11y(title)}>
    <ellipse cx={130} cy={136} rx={110} ry={8} fill="#140c06" opacity={.18} />
    <path d="M18 98C10 78 30 64 70 60L200 54C236 54 252 70 244 92C236 112 210 118 190 118L60 124C36 124 24 114 18 98Z" fill={C.crust} {...ink} />
    {[[40, 50], [90, 46], [140, 42], [188, 40]].map(([x, y], i) => <path key={i} d={`M${x} ${y + 34}C${x + 12} ${y + 22} ${x + 24} ${y + 18} ${x + 34} ${y + 18}`} fill="none" stroke={C.crustDark} strokeWidth={5} strokeLinecap="round" />)}
    <path d="M28 82C60 70 200 62 240 70" fill="none" stroke="#f5e2bc" strokeWidth={8} strokeLinecap="round" />
    {[[50, 66, -8], [80, 62, 6], [112, 60, -4], [146, 58, 8], [180, 56, -6]].map(([x, y, r], i) => <rect key={i} x={x} y={y} width={30} height={12} rx={4} transform={`rotate(${r} ${x} ${y})`} fill={C.pork} {...ink} strokeWidth={1.4} />)}
    {[[60, 54, -30], [100, 52, -20], [140, 50, -36], [176, 48, -24], [206, 50, -32]].map(([x, y, r], i) => <rect key={i} x={x} y={y} width={26} height={4} rx={2} transform={`rotate(${r} ${x} ${y})`} fill={i % 2 ? C.daikon : C.carrot} stroke={LINE} strokeWidth={1} />)}
    <rect x={120} y={36} width={46} height={8} rx={4} transform="rotate(-10 120 36)" fill={C.cucumber} {...ink} strokeWidth={1.2} />
    <CilantroLeaf x={70} y={44} r={-70} s={1.15} /><CilantroLeaf x={196} y={36} r={-110} s={1.05} /><ChilliSlice x={156} y={42} s={.95} /><ChilliSlice x={92} y={40} s={.85} />
    <path d="M14 100C4 116 24 132 64 130L194 124C226 122 248 110 246 96" fill={C.crust} {...ink} />
  </svg>;
}

/** Cơm tấm plate: broken rice, grilled pork chop, fried egg, cucumber, tomato & nước mắm cup. */
export function ComTamArt({ className = '', title }: Art) {
  return <svg viewBox="0 0 270 205" className={className} {...a11y(title)}>
    <ellipse cx={136} cy={112} rx={118} ry={78} fill="#140c06" opacity={.18} />
    <ellipse cx={130} cy={104} rx={120} ry={80} fill={BOWL} {...ink} />
    <ellipse cx={130} cy={104} rx={104} ry={66} fill="none" stroke={MELAMINE} strokeWidth={3.5} />
    <ellipse cx={130} cy={104} rx={98} ry={60} fill="none" stroke={GOLD_RIM} strokeWidth={1.4} />
    <path d="M44 108C40 70 90 56 120 66C140 72 148 100 136 122C120 146 52 140 44 108Z" fill={C.rice} {...ink} />
    {Array.from({ length: 28 }, (_, i) => <ellipse key={i} cx={58 + (i * 37) % 76} cy={78 + (i * 23) % 52} rx={3} ry={1.6} transform={`rotate(${i * 40} ${58 + (i * 37) % 76} ${78 + (i * 23) % 52})`} fill="#e7e1cf" />)}
    <path d="M128 70C150 52 206 56 214 78C222 100 196 124 166 120C140 116 112 92 128 70Z" fill={C.pork} {...ink} />
    {[0, 1, 2, 3].map(i => <path key={i} d={`M${142 + i * 16} 66L${132 + i * 16} 114`} stroke="#5f2f17" strokeWidth={4} strokeLinecap="round" opacity={.7} />)}
    <path d="M150 128C150 110 196 108 204 124C212 142 180 156 164 150C154 146 150 138 150 128Z" fill={C.eggWhite} {...ink} />
    <circle cx={176} cy={130} r={11} fill={C.yolk} stroke="#c47d0c" strokeWidth={1.4} />
    {[[66, 136], [82, 146], [100, 150]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={10} fill={C.cucumber} {...ink} strokeWidth={1.4} /><circle cx={x} cy={y} r={6} fill="#dff0c9" /></g>)}
    <path d="M200 92C212 86 226 92 226 104C226 112 212 116 204 110Z" fill={C.chilli} {...ink} strokeWidth={1.4} />
    <path d="M86 60H110" stroke={C.scallion} strokeWidth={4} strokeLinecap="round" /><path d="M76 70H96" stroke={C.scallion} strokeWidth={4} strokeLinecap="round" />
    {/* Little bowl of nước mắm pha */}
    <g transform="translate(230 162)">
      <circle cx={2} cy={3} r={22} fill="#140c06" opacity={.18} />
      <circle r={22} fill={BOWL} {...ink} strokeWidth={1.8} />
      <circle r={15} fill={C.fishSauce} opacity={.9} />
      <circle cx={-4} cy={-3} r={2} fill={C.chilli} /><circle cx={5} cy={3} r={1.8} fill={C.chilli} />
    </g>
  </svg>;
}

/** Two summer rolls with peanut-hoisin dip. */
export function SummerRollsArt({ className = '', title }: Art) {
  return <svg viewBox="0 0 240 150" className={className} {...a11y(title)}>
    <ellipse cx={120} cy={138} rx={100} ry={8} fill="#140c06" opacity={.18} />
    {[[30, 34, -6], [44, 78, 4]].map(([x, y, r], i) => <g key={i} transform={`rotate(${r} ${x + 70} ${y + 22})`}>
      <rect x={x} y={y} width={140} height={44} rx={22} fill="#f5f1e5" {...ink} opacity={.96} />
      <path d={`M${x + 20} ${y + 16}c10 -8 22 -8 30 0M${x + 60} ${y + 18}c10 -8 22 -8 30 0`} fill="none" stroke="#ef8f78" strokeWidth={6} strokeLinecap="round" />
      <path d={`M${x + 14} ${y + 30}H${x + 126}`} stroke={C.mint} strokeWidth={5} strokeLinecap="round" opacity={.72} />
      <path d={`M${x + 100} ${y + 12}l14 6`} stroke={C.basilStem} strokeWidth={3} strokeLinecap="round" />
    </g>)}
    <ellipse cx={204} cy={110} rx={28} ry={18} fill={BOWL} {...ink} />
    <ellipse cx={204} cy={108} rx={20} ry={11} fill="#8a4f2a" />
    <circle cx={198} cy={106} r={2} fill="#e8c38a" /><circle cx={208} cy={110} r={2} fill="#e8c38a" /><circle cx={204} cy={104} r={1.6} fill={C.chilli} />
  </svg>;
}

/** Cà phê sữa đá: an aluminum phin filter dripping into a glass of condensed milk over ice. */
export function CaPheArt({ className = '', title }: Art) {
  return <svg viewBox="0 0 160 220" className={className} {...a11y(title)}>
    <ellipse cx={80} cy={210} rx={46} ry={6} fill="#140c06" opacity={.18} />
    <path d="M38 78H122L114 204H46Z" fill={C.glass} fillOpacity={.65} {...ink} />
    <path d="M42 120H118L114 204H46Z" fill={C.coffee} />
    <path d="M45 176H115L114 204H46Z" fill={C.milk} />
    {[[52, 128, 10], [78, 140, -8], [98, 124, 14], [64, 156, -4]].map(([x, y, r], i) => <rect key={i} x={x} y={y} width={22} height={22} rx={4} transform={`rotate(${r} ${x + 11} ${y + 11})`} fill="#fff" fillOpacity={.38} stroke="#fff" strokeOpacity={.72} strokeWidth={1.5} />)}
    <rect x={26} y={68} width={108} height={10} rx={4} fill={C.steel} {...ink} />
    <path d="M50 20H110L104 68H56Z" fill={C.steel} {...ink} />
    <rect x={46} y={12} width={68} height={10} rx={4} fill={C.steelDark} {...ink} />
    <path d="M80 80V96" stroke={C.coffee} strokeWidth={4} strokeLinecap="round" />
    <path d="M60 34V60" stroke="#fff" strokeOpacity={.5} strokeWidth={4} strokeLinecap="round" />
  </svg>;
}

/** Contact: a stacked Vietnamese tiffin carrier (cặp lồng) and a catering tray of summer rolls. */
export function TiffinArt({ className = '', title }: Art) {
  return <svg viewBox="0 0 320 240" className={className} {...a11y(title)}>
    <ellipse cx={170} cy={226} rx={140} ry={10} fill="#140c06" opacity={.18} />
    <rect x={130} y={150} width={180} height={64} rx={10} fill={C.steel} {...ink} />
    <rect x={140} y={158} width={160} height={48} rx={6} fill={C.steelDark} />
    {[0, 1, 2, 3].map(i => <g key={i}><rect x={146 + i * 38} y={166} width={32} height={32} rx={14} fill="#f5f1e5" {...ink} strokeWidth={1.4} />
      <path d={`M${152 + i * 38} 178c6 -5 14 -5 20 0`} fill="none" stroke="#ef8f78" strokeWidth={4} strokeLinecap="round" />
      <path d={`M${150 + i * 38} 188h24`} stroke={C.mint} strokeWidth={3.5} strokeLinecap="round" /></g>)}
    <MintLeaf x={290} y={150} r={-140} s={1.2} /><BasilLeaf x={140} y={152} r={-60} s={1.1} />
    {[0, 1, 2].map(i => <g key={i}>
      <rect x={26} y={88 + i * 44} width={108} height={40} rx={8} fill={MELAMINE} {...ink} />
      <path d={`M30 ${100 + i * 44}H130`} stroke="#fff" strokeOpacity={.32} strokeWidth={3} />
      <rect x={20} y={84 + i * 44} width={120} height={8} rx={4} fill={C.steel} {...ink} strokeWidth={1.6} />
    </g>)}
    <path d="M40 88V40C40 20 120 20 120 40V88" fill="none" stroke={C.steelDark} strokeWidth={7} strokeLinecap="round" />
    <path d="M40 88V40C40 20 120 20 120 40V88" fill="none" stroke={LINE} strokeWidth={1.4} />
    <rect x={64} y={18} width={32} height={12} rx={6} fill={C.stool} {...ink} strokeWidth={1.6} />
  </svg>;
}

/** 404: an empty bowl tipped on its side, one noodle and one basil leaf left, chopsticks crossed. */
export function EmptyBowlArt({ className = '', title }: Art) {
  return <svg viewBox="0 0 320 240" className={className} {...a11y(title)}>
    <ellipse cx={160} cy={214} rx={130} ry={10} fill="#140c06" opacity={.18} />
    <g transform="rotate(-14 160 140)">
      <ellipse cx={160} cy={96} rx={110} ry={30} fill="#e6dcc3" {...ink} />
      <path d="M50 96H270C268 158 222 196 160 196C98 196 52 158 50 96Z" fill={BOWL} {...ink} />
      <path d="M56 120H264" stroke={MELAMINE} strokeWidth={11} />
      <path d="M60 127H260" stroke={GOLD_RIM} strokeWidth={2} />
      <path d="M62 120H258" stroke="#f7f1dd" strokeWidth={2.4} strokeDasharray="2 8" strokeLinecap="round" />
      <path d="M136 196H184L180 208H140Z" fill={BOWL} {...ink} />
      <path d="M120 96C140 84 150 104 172 92S200 100 214 92" fill="none" stroke={C.noodleEdge} strokeWidth={6} strokeLinecap="round" />
      <path d="M120 96C140 84 150 104 172 92S200 100 214 92" fill="none" stroke={C.noodle} strokeWidth={4} strokeLinecap="round" />
    </g>
    <BasilLeaf x={250} y={196} r={-20} s={1.4} />
    <path d="M30 214L150 160M40 222L156 170" stroke={C.bamboo} strokeWidth={7} strokeLinecap="round" />
    <path d="M30 214L150 160M40 222L156 170" stroke={LINE} strokeWidth={1.2} strokeOpacity={.6} strokeLinecap="round" />
  </svg>;
}
