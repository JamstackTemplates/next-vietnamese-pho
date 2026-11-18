// Larger scenes and objects: the hero canteen counter, gạch bông tile placemat, condiment caddy,
// chopstick tin, red stools, the broth clock with spices, the herb basket, baguette and chains.
import { useId } from 'react';
import { herbs } from '../../content/herbs';
import { BOWL, C, GOLD_RIM, LINE, MELAMINE } from './palette';
import { BowlGroup, PlateGroup, SauceDish, Steam, Utensils, type BowlDrawing } from './herb-bowl';

const ink = { stroke: LINE, strokeWidth: 2, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

/** A whole 8-pointed star anise pod (hoa hồi) — the signature aroma of phở broth. */
export function StarAnise({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <circle cx={2} cy={3} r={18} fill="#140c06" opacity={.18} />
    {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45})`}>
      <path d="M0 -3C4 -5 10 -15 0 -19C-10 -15 -4 -5 0 -3Z" fill={C.anise} stroke={LINE} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M0 -6V-14" stroke={C.aniseHighlight} strokeWidth={1.8} strokeLinecap="round" />
      <circle cx={0} cy={-10} r={2.2} fill={C.cinnamon} />
    </g>)}
    <circle r={4} fill={C.aniseHighlight} stroke={LINE} strokeWidth={1.2} />
  </g>;
}

/** A gạch bông encaustic ceramic placemat on the canteen table. */
function TilePlacemat({ x, y, w, h, r = 0 }: { x: number; y: number; w: number; h: number; r?: number }) {
  const uid = useId().replace(/:/g, '');
  return <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={8} y={12} width={w} height={h} rx={12} fill="#140c06" opacity={.34} />
    <rect width={w} height={h} rx={10} fill="#f4ebd4" stroke={LINE} strokeWidth={2.4} />
    <defs>
      <pattern id={`${uid}-gb`} width="72" height="72" patternUnits="userSpaceOnUse">
        <rect width="72" height="72" fill="#f4ebd4" />
        <g fill="#266c45" opacity=".88">
          <path d="M36 32C28 25 29 12 36 4C43 12 44 25 36 32Z" />
          <path d="M36 32C28 25 29 12 36 4C43 12 44 25 36 32Z" transform="rotate(90 36 36)" />
          <path d="M36 32C28 25 29 12 36 4C43 12 44 25 36 32Z" transform="rotate(180 36 36)" />
          <path d="M36 32C28 25 29 12 36 4C43 12 44 25 36 32Z" transform="rotate(270 36 36)" />
          <path fillRule="evenodd" d="M0-15A15 15 0 1 1 0 15A15 15 0 1 1 0-15ZM0-9.5A9.5 9.5 0 1 0 0 9.5A9.5 9.5 0 1 0 0-9.5Z" />
          <path fillRule="evenodd" transform="translate(72 0)" d="M0-15A15 15 0 1 1 0 15A15 15 0 1 1 0-15ZM0-9.5A9.5 9.5 0 1 0 0 9.5A9.5 9.5 0 1 0 0-9.5Z" />
          <path fillRule="evenodd" transform="translate(0 72)" d="M0-15A15 15 0 1 1 0 15A15 15 0 1 1 0-15ZM0-9.5A9.5 9.5 0 1 0 0 9.5A9.5 9.5 0 1 0 0-9.5Z" />
          <path fillRule="evenodd" transform="translate(72 72)" d="M0-15A15 15 0 1 1 0 15A15 15 0 1 1 0-15ZM0-9.5A9.5 9.5 0 1 0 0 9.5A9.5 9.5 0 1 0 0-9.5Z" />
        </g>
        <g fill="#c59b38">
          <circle cx="36" cy="36" r="4.5" /><circle cx="0" cy="0" r="4" /><circle cx="72" cy="0" r="4" /><circle cx="0" cy="72" r="4" /><circle cx="72" cy="72" r="4" />
        </g>
        <rect width="72" height="72" fill="none" stroke="#cfc3a6" strokeWidth="1" />
      </pattern>
    </defs>
    <rect x={10} y={10} width={w - 20} height={h - 20} rx={4} fill={`url(#${uid}-gb)`} stroke={MELAMINE} strokeWidth={3} />
  </g>;
}

export function ChopstickTin({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle cx={7} cy={10} r={55} fill="#140c06" opacity={.26} />
    <circle r={55} fill={C.steel} {...ink} />
    <circle r={47} fill={C.steelDark} />
    <circle r={47} fill="none" stroke="#eef2ef" strokeWidth={2} strokeDasharray="4 7" />
    {[[-24, -14], [-10, -26], [8, -22], [22, -8], [-28, 6], [-12, 8], [6, -4], [24, 12], [-18, 24], [2, 20], [16, 30], [-4, 34]].map(([a, b], i) =>
      <rect key={i} x={a - 4} y={b - 4} width={8} height={8} rx={1.5} fill={i % 3 === 0 ? C.stool : C.bamboo} stroke={LINE} strokeWidth={1.2} />)}
    {[[-36, -30, -40], [30, -34, 30]].map(([a, b, r], i) => <g key={i} transform={`translate(${a} ${b}) rotate(${r})`}>
      <path d="M-6 0C-6 -22 6 -22 6 0L4 30H-4Z" fill={BOWL} {...ink} strokeWidth={1.6} />
    </g>)}
  </g>;
}

/** Stainless condiment tray: sriracha bottle, hoisin bottle, pickled garlic vinegar jar, and chili satế jar. */
export function CondimentCaddy({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  const bottle = (cx: number, cy: number, body: string, cap: string, label: string, nozzle = false) => <g>
    <circle cx={cx + 2} cy={cy + 3} r={27} fill="#140c06" opacity={.2} />
    <circle cx={cx} cy={cy} r={27} fill={body} {...ink} />
    <circle cx={cx} cy={cy} r={20} fill="none" stroke="#fff" strokeOpacity={.25} strokeWidth={2} />
    <circle cx={cx} cy={cy} r={14} fill={cap} {...ink} strokeWidth={1.6} />
    {nozzle
      ? <><circle cx={cx} cy={cy} r={5.5} fill="#f7f2e4" stroke={LINE} strokeWidth={1.2} /><circle cx={cx} cy={cy} r={2} fill={body} /></>
      : <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="var(--font-sign)" fontSize={10} fontWeight={800} fill="#fff">{label}</text>}
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={-4} y={-2} width={270} height={88} rx={20} fill="#140c06" opacity={.28} />
    <rect x={-12} y={-12} width={270} height={88} rx={18} fill={C.steel} {...ink} />
    <rect x={-4} y={-4} width={254} height={72} rx={12} fill="#aeb7b1" stroke={C.steelDark} strokeWidth={2} />
    {bottle(30, 32, C.sriracha, '#1d6b3e', 'ỚT', true)}
    {bottle(94, 32, C.hoisin, '#5e3220', 'TƯƠNG', true)}
    {/* Pickled garlic & chilli vinegar jar (giấm tỏi) */}
    <g>
      <circle cx={158} cy={32} r={26} fill={C.glass} {...ink} />
      <circle cx={158} cy={32} r={20} fill="#f2ead0" />
      {[[-7, -5], [6, -7], [-3, 7], [8, 5], [1, -1]].map(([ox, oy], i) =>
        <ellipse key={i} cx={158 + ox} cy={32 + oy} rx={5.5} ry={3.8} transform={`rotate(${i * 35} ${158 + ox} ${32 + oy})`} fill="#fffaf0" stroke="#cbbd9a" strokeWidth={1} />)}
      <circle cx={151} cy={29} r={2.2} fill={C.chilli} /><circle cx={165} cy={37} r={2.2} fill={C.chilli} />
    </g>
    {/* House chili satế jar */}
    <g>
      <circle cx={220} cy={32} r={26} fill={C.glass} {...ink} />
      <circle cx={220} cy={32} r={19} fill={C.sate} />
      {[[214, 26], [226, 36], [218, 40], [228, 24], [212, 35]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={2} fill={C.seed} />)}
      <path d="M224 26L238 14" stroke={C.steel} strokeWidth={4} strokeLinecap="round" />
    </g>
  </g>;
}

/** Red plastic stool from the side, for the Visit section. */
export function StoolSide({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 160 150" aria-hidden="true" className={className}>
    <ellipse cx={80} cy={142} rx={66} ry={6} fill="#140c06" opacity={.22} />
    <path d="M18 24H142L128 140H112L104 60H56L48 140H32Z" fill={C.stool} {...ink} />
    <rect x={10} y={10} width={140} height={20} rx={8} fill={C.stool} {...ink} />
    <path d="M24 16H136" stroke="#fff" strokeOpacity={.35} strokeWidth={3} strokeLinecap="round" />
    <path d="M68 38C62 44 62 52 68 56H92C98 52 98 44 92 38Z" fill={C.stoolDark} />
    <path d="M30 76L46 76L44 96H32ZM114 76H130L128 96H116Z" fill={C.stoolDark} />
  </svg>;
}

/** Trà đá: a fluted glass of iced jasmine tea from above, with a red straw & condensation. */
export function IcedTea({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle cx={7} cy={10} r={45} fill="#140c06" opacity={.25} />
    <circle r={45} fill="#fff" fillOpacity={.14} stroke="#fff" strokeOpacity={.3} strokeWidth={2} />
    <circle r={40} fill={C.glass} fillOpacity={.82} {...ink} />
    <circle r={34} fill="#c88935" opacity={.85} />
    {[[-14, -12, 12], [10, -16, -18], [14, 8, 24], [-10, 12, -6], [0, -2, 40]].map(([a, b, r], i) =>
      <rect key={i} x={a - 9} y={b - 9} width={18} height={18} rx={4} transform={`rotate(${r} ${a} ${b})`} fill="#fff" fillOpacity={.62} stroke="#fff" strokeWidth={1.4} />)}
    <circle cx={16} cy={-14} r={6.5} fill={C.stool} stroke={LINE} strokeWidth={1.4} /><circle cx={16} cy={-14} r={2.8} fill={C.stoolDark} />
  </g>;
}

/** A laminated takeaway menu card, two-ink print, from above. */
export function LaminatedMenu({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  const rows = [['P1', 15.5], ['P2', 13.5], ['P3', 13.5], ['P4', 13]] as const;
  return <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={6} y={9} width={196} height={240} rx={10} fill="#140c06" opacity={.26} />
    <rect width={196} height={240} rx={10} fill="#fffbef" {...ink} />
    <rect x={10} y={10} width={176} height={44} rx={5} fill={MELAMINE} />
    <text x={24} y={40} textAnchor="start" fontFamily="var(--font-sign)" fontWeight={800} fontSize={26} letterSpacing={2} fill="#fffbef">PHỞ</text>
    {rows.map(([code], i) => <g key={code} transform={`translate(16 ${72 + i * 38})`}>
      <rect width={28} height={18} rx={4} fill="#1b241d" />
      <text x={14} y={13} textAnchor="middle" fontFamily="var(--font-sign)" fontWeight={800} fontSize={11} fill="#fffbef">{code}</text>
      <rect x={36} y={2} width={[78, 56, 66, 54][i]} height={6} rx={3} fill="#1b241d" opacity={.72} />
      <rect x={36} y={12} width={[96, 80, 90, 74][i]} height={4} rx={2} fill="#1b241d" opacity={.28} />
      <rect x={140} y={2} width={26} height={7} rx={3.5} fill={C.stool} />
    </g>)}
    <path d="M0 185L196 90V125L0 220Z" fill="#fff" opacity={.26} />
  </g>;
}

/** Green enamel stall-number plate ("Sạp 14"), like a Saigon street house-number plaque. */
export function StallPlate({ number, className = '' }: { number: string; className?: string }) {
  return <svg viewBox="0 0 124 88" role="img" aria-label={`Stall ${number}`} className={className}>
    <rect x={4} y={7} width={116} height={76} rx={14} fill="#140c06" opacity={.26} />
    <rect x={2} y={2} width={116} height={76} rx={14} fill="#f7f0df" stroke={LINE} strokeWidth={2.2} />
    <rect x={8} y={8} width={104} height={64} rx={9} fill={MELAMINE} />
    <rect x={12} y={12} width={96} height={56} rx={6} fill="none" stroke="#f7f0df" strokeWidth={1.6} />
    <text x={60} y={32} textAnchor="middle" fontFamily="var(--font-sign)" fontWeight={800} fontSize={14} fill={GOLD_RIM} letterSpacing={2.5}>SẠP</text>
    <text x={60} y={62} textAnchor="middle" fontFamily="var(--font-sign)" fontWeight={800} fontSize={34} fill="#f7f0df">{number}</text>
    <circle cx={9} cy={40} r={2.4} fill={GOLD_RIM} /><circle cx={111} cy={40} r={2.4} fill={GOLD_RIM} />
  </svg>;
}

const heroBowl: BowlDrawing = { broth: 'beef', noodles: 'banh-pho', protein: ['tai', 'chin', 'bo-vien'], garnish: ['bean-sprouts', 'thai-basil', 'lime', 'hanh-phi'] };

/** Hero: the Saigon canteen table at 11 a.m., overhead on warm teak with a gạch bông tile mat. */
export function HeroCounter({ className = '' }: { className?: string }) {
  const ids = herbs.map(h => h.id);
  const uid = useId().replace(/:/g, '');
  return <svg viewBox="0 0 800 660" role="img" aria-label="A steaming bowl of beef phở on a gạch bông tile placemat over a teak counter, beside a mounded plate of fresh herbs, sauce dish, iced tea, chopstick tin, condiment caddy and menu card" className={className}>
    <defs>
      <radialGradient id={`${uid}-glow`} cx="36%" cy="46%" r="54%">
        <stop offset="0%" stopColor="#ffe5a3" stopOpacity=".24" />
        <stop offset="100%" stopColor="#ffe5a3" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="800" height="660" fill={`url(#${uid}-glow)`} />
    <TilePlacemat x={36} y={76} w={492} h={460} r={-1.5} />
    <LaminatedMenu x={16} y={442} r={-11} />
    <g transform="translate(52 96)"><BowlGroup bowl={heroBowl} herbIds={ids} /></g>
    <PlateGroup cx={648} cy={404} herbIds={ids} onPlate={() => true} />
    <Utensils x={492} y={106} r={-5} />
    <ChopstickTin x={708} y={96} />
    <SauceDish x={556} y={248} />
    <StarAnise x={518} y={474} r={18} s={.95} />
    <StarAnise x={486} y={504} r={-24} s={.78} />
    <IcedTea x={726} y={584} />
    <CondimentCaddy x={286} y={554} r={-3} />
    <Steam x={282} y={300} scale={1.18} />
  </svg>;
}

/** Wall clock + simmering stockpot & whole phở spices for the 4 a.m. broth timeline. */
export function BrothClock({ marks, className = '' }: { marks: readonly string[]; className?: string }) {
  const angle = (time: string) => { const [h, m] = time.split(':').map(Number); return ((h % 12) + m / 60) * 30 - 90; };
  const pt = (deg: number, r: number) => [170 + Math.cos(deg * Math.PI / 180) * r, 150 + Math.sin(deg * Math.PI / 180) * r];
  const start = angle(marks[0]); const end = angle(marks[marks.length - 1]);
  const [sx, sy] = pt(start, 96); const [ex, ey] = pt(end, 96);
  const large = ((end - start + 360) % 360) > 180 ? 1 : 0;
  return <svg viewBox="0 0 340 420" aria-hidden="true" className={className}>
    {/* Wall clock */}
    <circle cx={176} cy={158} r={124} fill="#140c06" opacity={.16} />
    <circle cx={170} cy={150} r={124} fill={MELAMINE} {...ink} />
    <circle cx={170} cy={150} r={116} fill="none" stroke={GOLD_RIM} strokeWidth={2} />
    <circle cx={170} cy={150} r={108} fill="var(--surface)" {...ink} />
    {Array.from({ length: 12 }, (_, i) => {
      const [x1, y1] = pt(i * 30 - 90, 100); const [x2, y2] = pt(i * 30 - 90, i % 3 === 0 ? 86 : 92);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth={i % 3 === 0 ? 3.5 : 2} strokeLinecap="round" />;
    })}
    <path d={`M${sx} ${sy}A96 96 0 ${large} 1 ${ex} ${ey}`} fill="none" stroke="var(--broth)" strokeWidth={11} strokeLinecap="round" opacity={.92} />
    {marks.map(t => { const [x, y] = pt(angle(t), 96); return <circle key={t} cx={x} cy={y} r={7.5} fill="var(--surface)" stroke="var(--ink)" strokeWidth={2.8} />; })}
    {(() => {
      const [hx, hy] = pt(angle('10:30'), 52); const [mx, my] = pt(180 - 90, 78);
      return <g stroke="var(--ink)" strokeLinecap="round"><line x1={170} y1={150} x2={hx} y2={hy} strokeWidth={6.5} /><line x1={170} y1={150} x2={mx} y2={my} strokeWidth={3.5} /></g>;
    })()}
    <circle cx={170} cy={150} r={7.5} fill={C.stool} stroke="var(--ink)" strokeWidth={2} />
    <text x={170} y={108} textAnchor="middle" fontFamily="var(--font-hand)" fontSize={18} fill="var(--muted)">nồi phở</text>

    {/* Simmering stainless broth stockpot + charred aromatics + spices below */}
    <g transform="translate(54 274)">
      <ellipse cx={116} cy={126} rx={96} ry={12} fill="#140c06" opacity={.16} />
      {/* Flame glow */}
      <ellipse cx={116} cy={122} rx={70} ry={7} fill="#e67222" opacity={.5} />
      {/* Handles */}
      <path d="M24 44H10C4 44 4 62 10 62H24M208 44H222C228 44 228 62 222 62H208" fill="none" stroke={C.steelDark} strokeWidth={6} strokeLinecap="round" />
      {/* Stockpot body */}
      <path d="M24 32H208V112C208 122 198 126 116 126C34 126 24 122 24 112Z" fill={C.steel} {...ink} />
      <path d="M36 40V114" stroke="#fff" strokeOpacity={.45} strokeWidth={10} strokeLinecap="round" />
      <path d="M188 40V114" stroke={C.steelDark} strokeOpacity={.4} strokeWidth={8} strokeLinecap="round" />
      {/* Rich amber broth rim */}
      <ellipse cx={116} cy={32} rx={92} ry={16} fill="#9c5a1e" {...ink} />
      <ellipse cx={116} cy={32} rx={82} ry={11} fill="#d4882a" opacity={.9} />
      {/* Ladle resting in pot */}
      <path d="M150 32L186 -12" stroke={C.steelDark} strokeWidth={5} strokeLinecap="round" />
      <path d="M150 32L186 -12" stroke="#fff" strokeOpacity={.4} strokeWidth={1.6} strokeLinecap="round" />
    </g>
    {/* Whole star anise & cinnamon sticks */}
    <StarAnise x={48} y={366} r={14} s={1.15} />
    <StarAnise x={294} y={358} r={-22} s={1.05} />
    <g transform="translate(274 394) rotate(-18)">
      <rect x={-26} y={-6} width={52} height={12} rx={5} fill={C.cinnamon} stroke={LINE} strokeWidth={1.6} />
      <path d="M-20 0H20" stroke="#532a12" strokeWidth={2} strokeLinecap="round" />
    </g>
    {/* Charred onion half */}
    <g transform="translate(82 396) rotate(10)">
      <ellipse rx={18} ry={14} fill="#ebd6d8" stroke={LINE} strokeWidth={1.6} />
      <ellipse rx={13} ry={9.5} fill="none" stroke="#b68791" strokeWidth={1.6} />
      <ellipse rx={7} ry={5} fill="none" stroke="#99646f" strokeWidth={1.4} />
      <path d="M-16 6C-8 14 8 14 16 6" fill="none" stroke="#2f1c16" strokeWidth={3} strokeLinecap="round" />
    </g>
  </svg>;
}

/** A wide, shallow woven bamboo tray (mẹt tre) for the herb basket section. */
export function Basket({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true" className={className}>
    <path d="M20 40C200 70 800 70 980 40L900 200C700 220 300 220 100 200Z" fill="var(--kraft)" stroke={LINE} strokeWidth={3} strokeLinejoin="round" />
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${40 + i * 13} ${70 + i * 24}C300 ${100 + i * 24} 700 ${100 + i * 24} ${960 - i * 13} ${70 + i * 24}`} fill="none" stroke="var(--kraft-ink)" strokeOpacity={.32} strokeWidth={3} />)}
    {Array.from({ length: 24 }, (_, i) => <path key={`v${i}`} d={`M${70 + i * 37} 60L${92 + i * 34} 205`} stroke="var(--kraft-ink)" strokeOpacity={.22} strokeWidth={4} />)}
    <path d="M20 40C200 10 800 10 980 40C800 70 200 70 20 40Z" fill="var(--kraft)" stroke={LINE} strokeWidth={3} />
    <path d="M40 40C220 18 780 18 960 40" fill="none" stroke="var(--kraft-ink)" strokeOpacity={.4} strokeWidth={4} strokeDasharray="14 8" />
  </svg>;
}

/** A flaky, golden-crusted Vietnamese bánh mì baguette with crispy scoring slashes. */
export function Baguette({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 1200 170" preserveAspectRatio="none" aria-hidden="true" className={className}>
    <ellipse cx={600} cy={148} rx={540} ry={12} fill="#140c06" opacity={.16} />
    <path d="M36 92C26 38 88 20 200 18H1000C1112 20 1174 38 1164 92C1154 138 1092 146 1000 146H200C108 146 46 138 36 92Z" fill={C.crust} stroke={LINE} strokeWidth={3} />
    <path d="M70 68C120 44 200 38 260 38H940C1010 38 1080 44 1130 68" fill="none" stroke="#f5d292" strokeWidth={12} strokeLinecap="round" opacity={.72} />
    {Array.from({ length: 9 }, (_, i) => <g key={i}>
      <path d={`M${150 + i * 112} 106C${178 + i * 112} 72 ${214 + i * 112} 50 ${246 + i * 112} 46`} fill="none" stroke={C.crustDark} strokeWidth={10} strokeLinecap="round" />
      <path d={`M${154 + i * 112} 102C${180 + i * 112} 72 ${214 + i * 112} 53 ${244 + i * 112} 49`} fill="none" stroke="#f2dca8" strokeWidth={3} strokeLinecap="round" opacity={.7} />
    </g>)}
  </svg>;
}

/** A brass/iron chain a menu board hangs from. */
export function Chain({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 14 48" aria-hidden="true" className={className}>
    {[0, 1, 2, 3].map(i => <rect key={i} x={3} y={1 + i * 11} width={8} height={14} rx={4} fill="none" stroke="#d4b97c" strokeWidth={2.4} />)}
  </svg>;
}
