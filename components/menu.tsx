// /menu/ sections. Each menu section has its own presentation: a backlit board for phở, kraft
// wrappers on a baker's board for bánh mì, a ceramic plate for rice & vermicelli, and ticket stubs.
import type { ReactNode } from 'react';
import { TAGS, type MenuItem, type MenuSection, type Tag } from '../content/menu';
import { dishCodes, formatPrice, sectionById } from '../lib/menu';
import { CaPheArt, ComTamArt, PhoSide, SummerRollsArt } from './art/dishes';
import { TAG_ICONS } from './art/icons';
import { Baguette, Chain } from './art/scenes';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };

export function TagIcons({ tags, className = '' }: { tags: readonly Tag[]; className?: string }) {
  if (!tags.length) return null;
  return <ul className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-label="Dietary notes">
    {tags.map(tag => { const Icon = TAG_ICONS[tag]; return <li key={tag} className="inline-flex" title={TAGS[tag].label}>
      <Icon className={`h-5 w-5 ${tag === 'spicy' ? 'text-chilli-text' : ''}`} /><span className="sr-only">{TAGS[tag].label}</span>
    </li>; })}
  </ul>;
}

const CODES = dishCodes();

/** The printed dish code (P1, B2…) that guests can point at or say at the counter. */
export function DishCode({ id, className = '' }: { id: string; className?: string }) {
  const code = CODES.get(id);
  return code ? <span className={`dish-code mr-2 align-[.12em] ${className}`} lang="en">{code}</span> : null;
}

function SoldOut({ item }: { item: MenuItem }) {
  return item.available ? null : <span className="stamp ml-1" lang="vi">Hết rồi · <span lang="en">Sold out today</span></span>;
}

function SectionTitle({ section, tone = '' }: { section: MenuSection; tone?: string }) {
  return <div className={tone}>
    {section.vietnamese !== section.title ? <p className="hand text-2xl" lang="vi">{section.vietnamese}</p> : null}
    <h2 id={`${section.id}-title`} className="misprint font-sign text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold uppercase leading-none tracking-wide" lang="vi">{section.title}</h2>
    <p className="mt-2 max-w-[52ch] opacity-85">{section.intro}</p>
  </div>;
}

/** Phở: a large backlit menu board with S / L price columns and dotted leaders. */
export function PhoBoard() {
  const section = sectionById('pho');
  return <section id="pho" aria-labelledby="pho-title" className="wrap relative scroll-mt-24 pt-12">
    <Chain className="absolute top-0 left-[22%] h-14 w-4" /><Chain className="absolute top-0 right-[22%] h-14 w-4" />
    <div className="board grid gap-6 p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_14rem]">
      <div>
        <SectionTitle section={section} tone="text-board-ink [&_h2]:text-[var(--primary)] [&_.hand]:text-[var(--primary)]" />
        <div aria-hidden="true" className="mt-6 hidden grid-cols-[minmax(0,1fr)_auto_auto] items-end sm:grid gap-x-3 border-b-2 border-board-ink/30 pb-1.5 text-xs font-bold uppercase tracking-wider">
          <span /><span className="w-16 text-right">Small</span><span className="w-16 text-right">Large</span>
        </div>
        <ul>
          {section.items.map(item => <li key={item.id} className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-baseline gap-x-4 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-x-3 border-b border-dashed border-board-ink/22 py-3.5 last:border-0">
            <div className="col-span-3 min-w-0 sm:col-span-1">
              <div className="flex items-baseline gap-2">
                <DishCode id={item.id} />
                <h3 className={`text-xl font-bold uppercase tracking-[.01em] ${item.signature ? 'relative' : ''}`} lang="vi">
                  {item.signature ? <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1rem)]"><path d="M12 34C8 12 90 4 150 8S196 30 186 44 60 58 22 48 4 22 40 12" fill="none" stroke="var(--chilli)" strokeWidth={2.8} strokeLinecap="round" /></svg> : null}
                  <span className="relative">{item.vietnamese}</span>
                </h3>
                <span aria-hidden="true" className="leader" />
              </div>
              <p className="mt-0.5 font-semibold">{item.name}{item.signature ? <span className="hand ml-2 rounded bg-[var(--primary)] px-2 py-0.5 text-base text-white" lang="vi">Nhà làm · house made</span> : null}<SoldOut item={item} /></p>
              <p className="text-sm opacity-80">{item.description}</p>
              <TagIcons tags={item.tags} className="mt-1.5" />
            </div>
            <span className="mt-2 text-lg font-bold tabular sm:mt-0 sm:w-16 sm:text-right"><span className="mr-1 text-xs font-semibold uppercase opacity-60 sm:sr-only">Small </span>{formatPrice(item.sizes!.small)}</span>
            <span className="mt-2 text-lg font-bold tabular sm:mt-0 sm:w-16 sm:text-right"><span className="mr-1 text-xs font-semibold uppercase opacity-60 sm:sr-only">Large </span>{formatPrice(item.sizes!.large)}</span>
          </li>)}
        </ul>
      </div>
      <PhoSide className="mx-auto hidden w-56 self-center drop-shadow-md md:block" />
    </div>
  </section>;
}

/** Bánh mì: kraft-paper deli wraps presented on a warm bamboo baker's band. */
export function BanhMiBand() {
  const section = sectionById('banh-mi');
  return <section id="banh-mi" aria-labelledby="banh-mi-title" className="relative mt-20 scroll-mt-24 overflow-hidden border-y-[3px] border-ink bg-tile-soft py-16">
    <div className="wrap grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
      <div><SectionTitle section={section} tone="[&_h2]:text-primary-text [&_.hand]:text-primary-text" /></div>
      <p className="hand max-w-[20ch] -rotate-2 rounded-full border border-ink/25 bg-surface px-4 py-1 text-2xl text-primary-text shadow-xs">Baked this morning, filled to order.</p>
    </div>
    <div className="wrap relative mt-10">
      <Baguette className="mx-auto -mb-6 hidden h-28 w-[88%] max-w-4xl lg:block" />
      <ul className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {section.items.map((item, i) => <li key={item.id}
          className={`flex flex-col justify-between rounded-xl border-2 border-ink/75 bg-kraft p-4 text-kraft-ink shadow-[0_8px_16px_-10px_rgb(20_12_4/.35)] ${['lg:-rotate-1', 'lg:rotate-1', 'lg:translate-y-1', 'lg:-rotate-1', 'lg:rotate-1'][i % 5]} ${item.available ? '' : 'saturate-50 opacity-85'}`}>
          <div>
            <div className="flex items-start justify-between gap-2 border-b border-dashed border-kraft-ink/25 pb-2.5">
              <h3 className="font-sign text-xl font-extrabold uppercase leading-tight tracking-wide" lang="vi"><DishCode id={item.id} className="mr-1.5" />{item.vietnamese}</h3>
              <span className="shrink-0 rounded-full bg-[#382614] px-2.5 py-0.5 text-sm font-bold text-[#f7e8cb] tabular">{formatPrice(item.price!)}</span>
            </div>
            <p className="mt-2 font-bold">{item.name}</p>
            <p className="mt-1 text-sm leading-snug text-kraft-ink/85">{item.description}</p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-kraft-ink/15 pt-2.5">
            <TagIcons tags={item.tags} />
            {item.signature ? <span className="hand rounded bg-[#382614]/10 px-2 py-0.5 text-base font-semibold">our favourite</span> : null}
            <SoldOut item={item} />
          </div>
        </li>)}
      </ul>
    </div>
  </section>;
}

/** Cơm & bún: a big cơm tấm ceramic plate beside a refined canteen menu ledger. */
export function RicePlate() {
  const section = sectionById('com-bun');
  return <section id="com-bun" aria-labelledby="com-bun-title" className="wrap mt-20 grid scroll-mt-24 items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
    <div className="tile-bg relative rounded-[2rem] border-2 border-ink/75 p-6 shadow-md">
      <ComTamArt className="relative w-full drop-shadow-md" title="A cơm tấm plate: broken rice, grilled pork chop, fried egg and cucumber" />
    </div>
    <div>
      <SectionTitle section={section} tone="[&_h2]:text-primary-text [&_.hand]:text-primary-text" />
      <ul className="canteen-card mt-6 divide-y-2 divide-dashed divide-rule p-5 sm:p-6">
        {section.items.map(item => <li key={item.id} className="flex items-start gap-4 py-4 first:pt-1 last:pb-1">
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold" lang="vi"><DishCode id={item.id} /><span className="uppercase">{item.vietnamese}</span>{item.signature ? <span className="hand ml-2 text-lg font-normal text-chilli-text">house favourite</span> : null}</h3>
            <p className="font-semibold">{item.name}<SoldOut item={item} /></p>
            <p className="text-sm text-muted">{item.description}</p>
            <TagIcons tags={item.tags} className="mt-1.5" />
          </div>
          <span className="rounded-full border-2 border-ink bg-surface-warm px-3.5 py-1 text-lg font-bold tabular">{formatPrice(item.price!)}</span>
        </li>)}
      </ul>
    </div>
  </section>;
}

function Stub({ section, art }: { section: MenuSection; art: ReactNode }) {
  return <section id={section.id} aria-labelledby={`${section.id}-title`} className="ticket-shadow scroll-mt-24">
    <div className="ticket px-6 py-9">
      <div className="flex items-start justify-between gap-4 border-b-2 border-dashed border-rule pb-4">
        <div>
          <p className="hand text-xl text-primary-text" lang="vi">{section.vietnamese}</p>
          <h2 id={`${section.id}-title`} className="misprint font-sign text-4xl font-extrabold uppercase leading-none tracking-wide text-primary-text">{section.title}</h2>
          <p className="mt-1 text-sm text-muted">{section.intro}</p>
        </div>
        <div className="w-24 shrink-0">{art}</div>
      </div>
      <ul className="mt-2">
        {section.items.map(item => <li key={item.id} className="border-b border-dashed border-rule py-3 last:border-0">
          <div className="flex items-baseline gap-2">
            <h3 className="font-bold uppercase" lang="vi"><DishCode id={item.id} />{item.vietnamese}</h3>
            <span aria-hidden="true" className="leader" />
            <span className="font-bold tabular">{formatPrice(item.price!)}</span>
          </div>
          <p className="text-sm"><span className="font-semibold">{item.name}</span> · {item.description}<SoldOut item={item} /></p>
          <TagIcons tags={item.tags} className="mt-1" />
        </li>)}
      </ul>
    </div>
  </section>;
}

/** Sides and drinks as a pair of ticket stubs. */
export function StubPair() {
  return <div className="wrap mt-20 grid gap-10 md:grid-cols-2">
    <div className="md:-rotate-1"><Stub section={sectionById('sides')} art={<SummerRollsArt className="w-full" />} /></div>
    <div className="md:mt-8 md:rotate-1"><Stub section={sectionById('drinks')} art={<CaPheArt className="w-full" />} /></div>
  </div>;
}

/** Legend of dietary markers, the allergen note and a link onwards. */
function LegendRoot({ children }: Children) {
  return <aside aria-labelledby="legend-title" className="wrap mt-16">
    <div className="canteen-card grid gap-8 p-6 sm:p-8 md:grid-cols-2">
      <div>
        <h2 id="legend-title" className="font-display text-2xl font-bold text-primary-text">What the markers mean</h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
          {(Object.keys(TAGS) as Tag[]).map(tag => { const Icon = TAG_ICONS[tag];
            return <li key={tag} className="flex items-center gap-2"><Icon className={`h-5 w-5 ${tag === 'spicy' ? 'text-chilli-text' : 'text-primary-text'}`} />{TAGS[tag].label}</li>; })}
        </ul>
      </div>
      <div>{children}</div>
    </div>
  </aside>;
}
function AllergenNote({ children }: Children) {
  return <p className="rounded-xl border-2 border-dashed border-chilli bg-surface-warm/50 p-4"><strong>Allergens. </strong>{children}</p>;
}
function Onwards({ children }: Children) {
  return <p className="mt-4 text-lg">{children}</p>;
}
function BowlLink({ children }: Children) {
  return <SiteLink href="/bowl/" className="text-link font-semibold">{children}</SiteLink>;
}
function MenuLink({ children }: Children) {
  return <SiteLink href="/menu/" className="text-link font-semibold">{children}</SiteLink>;
}
export const Legend = Object.assign(LegendRoot, { AllergenNote, Onwards, BowlLink, MenuLink });
