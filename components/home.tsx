// Home page sections. Copy lives in app/page.tsx; these components own markup, layout and art.
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import { bowlSteps } from '../content/bowl';
import { business } from '../content/business';
import { herbs } from '../content/herbs';
import type { MenuItem } from '../content/menu';
import { stepOptions } from '../lib/bowl';
import { mapDirectionsUrl } from '../lib/maps';
import { boardHighlights, formatPrice, sectionById } from '../lib/menu';
import { BanhMiArt, ComTamArt, PhoSide } from './art/dishes';
import { HerbArt } from './art/herbs';
import { BrothClock, Chain, HeroCounter, StallPlate, StoolSide } from './art/scenes';
import { PinIcon } from './art/icons';
import { GoogleMap } from './google-map';
import { DishCode } from './menu';
import { HoursTable } from './hours-table';
import { OpenStatus } from './open-status';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type Children = { children: ReactNode };

/* ---------------- Hero ---------------- */

function HeroRoot({ children }: Children) {
  return <section aria-labelledby="hero-title" className="tile-bg tile-faint relative overflow-hidden">
    <div className="teak relative aspect-[5/4] w-full border-b-[3px] border-ink sm:aspect-[16/10] lg:absolute lg:top-0 lg:bottom-12 lg:right-0 lg:aspect-auto lg:w-[57%] lg:rounded-bl-[2.75rem] lg:border-l-[3px] lg:shadow-[inset_8px_0_24px_rgb(16_10_4/.28)]">
      <HeroCounter className="absolute inset-0 h-full w-full" />
    </div>
    <div className="wrap relative grid py-8 lg:min-h-[43rem] lg:grid-cols-12 lg:items-center lg:pt-12 lg:pb-22">
      <div className="hero-reveal flex flex-col items-start gap-5 lg:col-span-5">{children}</div>
    </div>
    <div aria-hidden="true" className="dado h-10 border-t-[3px] border-ink lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-12" />
  </section>;
}

/** The Saigon painted shopfront sign: bold condensed lettering with crisp Vietnamese diacritics. */
function Sign({ children }: Children) {
  const [first, ...rest] = business.name.toUpperCase().split(' ');
  return <div className="relative mt-2">
    <span aria-hidden="true" className="absolute -top-5 left-8 h-5 w-1 bg-ink/70" />
    <span aria-hidden="true" className="absolute -top-5 right-8 h-5 w-1 bg-ink/70" />
    <div className="signboard -rotate-1 px-6 pt-4 pb-3 sm:px-8">
      <div className="flex items-baseline gap-3">
        <p className="font-sign text-[clamp(3.3rem,7.2vw,5.2rem)] font-extrabold leading-[.88] tracking-tight">{first}</p>
        <p className="font-sign text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-[.92] tracking-wide">{rest.join(' ')}</p>
      </div>
      <p className="mt-2 border-t-2 border-sign-ink/35 pt-1.5 text-xs font-bold uppercase tracking-[.14em] sm:text-sm">{children}</p>
    </div>
  </div>;
}
function Heading({ children }: Children) {
  return <h1 id="hero-title" className="max-w-[16ch] font-display text-[clamp(2.15rem,4.3vw,3.45rem)] font-extrabold leading-[1.06] tracking-[-.02em] text-ink">{children}</h1>;
}
function Introduction({ children }: Children) {
  return <p className="max-w-[36ch] text-lg text-muted sm:text-xl">{children}</p>;
}
function Actions({ children }: Children) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}
function MenuAction({ children }: Children) {
  return <SiteLink href="/menu/" className="button">{children}</SiteLink>;
}
function BowlAction({ children }: Children) {
  return <SiteLink href="/bowl/" className="button button-quiet">{children}</SiteLink>;
}
function Status() {
  return <div className="flex flex-wrap items-center gap-2.5 pt-1">
    <span className="text-sm font-semibold text-muted xl:hidden">Walk-ins only ·</span>
    <span className="xl:hidden"><OpenStatus /></span>
    <p className="hidden items-center gap-2 text-sm font-medium text-muted xl:inline-flex">
      <PinIcon className="h-4 w-4 text-primary-text" />
      <span>Stall 14, Lower Level · 30 counter stools · Walk-ins only</span>
    </p>
  </div>;
}
export const Hero = Object.assign(HeroRoot, { Sign, Heading, Introduction, Actions, MenuAction, BowlAction, Status });

/* ---------------- Three menu boards ---------------- */

const VIGNETTES: Record<string, ReactNode> = {
  pho: <PhoSide className="h-28 w-auto drop-shadow-sm" />,
  'banh-mi': <BanhMiArt className="h-24 w-auto drop-shadow-sm" />,
  'com-bun': <ComTamArt className="h-28 w-auto drop-shadow-sm" />,
};

function BoardItem({ item }: { item: MenuItem }) {
  const price = item.sizes ? `${formatPrice(item.sizes.small)} / ${formatPrice(item.sizes.large)}` : formatPrice(item.price ?? 0);
  return <li className="border-b border-dashed border-board-ink/18 py-3 last:border-0">
    <div className="flex items-baseline gap-2 text-[.98rem]">
      <DishCode id={item.id} /><span className="font-bold uppercase tracking-[.01em]" lang="vi">{item.vietnamese}</span>
      <span aria-hidden="true" className="leader" />
      {item.sizes ? null : <span className="whitespace-nowrap tabular font-bold">{price}</span>}
    </div>
    {item.sizes ? <p className="mt-0.5 tabular text-right text-[.95rem] font-bold"><span className="sr-only">Small </span>{formatPrice(item.sizes.small)} <span className="font-normal opacity-60">/</span> <span className="sr-only">Large </span>{formatPrice(item.sizes.large)}</p> : null}
    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-semibold text-board-ink/85">{item.name}{item.available ? null : <span className="stamp" lang="vi">Hết rồi · Sold out today</span>}</p>
    <p className="mt-0.5 text-xs leading-relaxed text-board-ink/70">{item.description}</p>
  </li>;
}

function BoardsRoot({ children }: Children) {
  return <section aria-labelledby="boards-title" className="plank-wall relative border-b-[3px] border-ink py-20 text-band-ink">
    <div className="wrap">{children}
      <ul className="mt-12 grid gap-14 md:grid-cols-3 md:gap-8">
        {['pho', 'banh-mi', 'com-bun'].map((id, i) => {
          const section = sectionById(id);
          return <li key={id} className={`relative ${['md:mt-0', 'md:mt-8', 'md:mt-3'][i]}`}>
            <Chain className="absolute -top-11 left-[18%] h-12 w-3.5" /><Chain className="absolute -top-11 right-[18%] h-12 w-3.5" />
            <article className="board flex h-full flex-col p-6 pt-5">
              <div className="-mt-1 flex items-end justify-between gap-2 border-b-2 border-dashed border-board-ink/25 pb-3">
                <div>
                  <p className="hand text-lg leading-none text-board-ink/70" lang="vi">{section.vietnamese}</p>
                  <h3 className="misprint mt-1 font-sign text-4xl font-extrabold uppercase leading-none tracking-wide text-[var(--primary)]" lang="vi">{section.title}</h3>
                </div>
                <div className="-mb-2 -mr-1 shrink-0">{VIGNETTES[id]}</div>
              </div>
              <ul className="mt-2 flex-1">{boardHighlights(section).map(item => <BoardItem key={item.id} item={item} />)}</ul>
              <SiteLink href={`/menu/#${id}`} className="mt-4 inline-flex items-center gap-1.5 border-t border-board-ink/15 pt-3 font-bold text-[var(--primary)] no-underline hover:underline">
                <span>See the {section.title} board</span>
                <span aria-hidden="true">→</span>
              </SiteLink>
            </article>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
function BoardsHeading({ children }: Children) {
  return <>
    <p lang="vi" className="hand text-2xl text-broth">Thực đơn tại quầy</p>
    <h2 id="boards-title" className="mt-1 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">{children}</h2>
  </>;
}
function BoardsIntro({ children }: Children) {
  return <p className="mt-3 max-w-[52ch] text-lg text-band-muted">{children}</p>;
}
export const MenuBoards = Object.assign(BoardsRoot, { Heading: BoardsHeading, Intro: BoardsIntro });

/* ---------------- Broth clock ---------------- */

type StepProps = { time: string; title: string; children: ReactNode };
function BrothStep(_: StepProps) { return null; }

function BrothRoot({ children }: Children) {
  const all = Children.toArray(children);
  const steps = all.filter((child): child is ReactElement<StepProps> => isValidElement(child) && child.type === BrothStep);
  const rest = all.filter(child => !(isValidElement(child) && child.type === BrothStep));
  return <section aria-labelledby="broth-title" className="relative overflow-hidden py-20">
    <div className="wrap grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="canteen-card relative mx-auto w-full max-w-[24rem] bg-surface-warm/65 p-6">
        <BrothClock marks={steps.map(step => step.props.time)} className="w-full" />
        <p className="hand mt-2 text-center text-xl text-muted">12 hours of marrow, star anise &amp; charred ginger</p>
      </div>
      <div>
        {rest}
        <ol className="mt-8 border-l-[3px] border-dashed border-broth pl-6">
          {steps.map(step => <li key={step.props.time} className="relative pb-6 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[2.15rem] top-2.5 h-4 w-4 rounded-full border-[3px] border-ink bg-broth" />
            <div className="rounded-xl border border-rule/80 bg-surface/85 px-4 py-3 shadow-xs">
              <p className="flex flex-wrap items-baseline gap-x-3.5">
                <time className="font-sign text-3xl font-extrabold leading-none text-broth-text tabular">{step.props.time}</time>
                <span className="text-lg font-bold">{step.props.title}</span>
              </p>
              <p className="mt-1 max-w-[48ch] text-sm text-muted sm:text-base">{step.props.children}</p>
            </div>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
function BrothHeading({ children }: Children) {
  return <>
    <p lang="vi" className="hand text-2xl text-broth-text">Nồi nước dùng từ 4 giờ sáng</p>
    <h2 id="broth-title" className="mt-1 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] text-primary-text">{children}</h2>
  </>;
}
function BrothIntro({ children }: Children) {
  return <p className="mt-3 max-w-[48ch] text-lg text-muted">{children}</p>;
}
export const BrothTimeline = Object.assign(BrothRoot, { Heading: BrothHeading, Intro: BrothIntro, Step: BrothStep });

/* ---------------- Herb basket ---------------- */

function BasketRoot({ children }: Children) {
  return <section aria-labelledby="herbs-title" className="relative border-y-[3px] border-ink bg-tile-soft">
    <div aria-hidden="true" className="border-b-2 border-ink/20 bg-surface/55 py-1"><div className="tile-strip" /></div>
    <div className="py-16 sm:py-20">
      <div className="wrap text-center">{children}</div>
      <div className="relative mx-auto mt-10 max-w-6xl px-4">
        <ul className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3">
          {herbs.map(herb => <li key={herb.id} className={`bamboo-mat flex flex-col items-center rounded-2xl border-2 border-ink/75 px-3 py-4 text-center shadow-sm transition-transform hover:-translate-y-0.5 ${herb.inBasket ? '' : 'opacity-55 grayscale'}`}>
            <div className="h-24 w-24 rounded-full border border-rule bg-surface/85 p-2 shadow-inner sm:h-26 sm:w-26"><HerbArt id={herb.id} title={herb.name} /></div>
            <p className="mt-3 font-bold leading-tight">{herb.name}</p>
            <p className="hand text-xl leading-tight text-primary-text" lang="vi">{herb.vietnamese}</p>
            <p className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">{herb.inBasket ? herb.note : 'Not in today’s basket'}</p>
          </li>)}
        </ul>
      </div>
    </div>
    <div aria-hidden="true" className="border-t-2 border-ink/20 bg-surface/55 py-1"><div className="tile-strip" /></div>
  </section>;
}
function BasketHeading({ children }: Children) {
  return <>
    <p lang="vi" className="hand text-2xl text-primary-text">Mẹt rau thơm mỗi bàn</p>
    <h2 id="herbs-title" className="mt-1 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] text-primary-text">{children}</h2>
  </>;
}
function BasketIntro({ children }: Children) {
  return <p className="mx-auto mt-3 max-w-[52ch] text-lg text-muted">{children}</p>;
}
export const HerbBasket = Object.assign(BasketRoot, { Heading: BasketHeading, Intro: BasketIntro });

/* ---------------- Build-your-bowl ticket ---------------- */

function TicketRoot({ children }: Children) {
  return <section aria-labelledby="ticket-title" className="tile-bg tile-faint overflow-hidden py-20">
    <div className="wrap">
      <div className="ticket-shadow mx-auto max-w-5xl -rotate-1">
        <div className="ticket grid gap-0 px-6 py-10 md:grid-cols-[1.35fr_repeat(4,1fr)] md:px-5">{children}</div>
      </div>
    </div>
  </section>;
}
function TicketLead({ children }: Children) {
  return <div className="flex flex-col items-start justify-center gap-4 border-b-2 border-dashed border-rule pb-6 md:border-b-0 md:border-r-2 md:pr-6 md:pb-0">
    <span className="stamp">Order at the counter</span>
    {children}
    <SiteLink href="/bowl/" className="button">Build your bowl</SiteLink>
  </div>;
}
function TicketHeading({ children }: Children) {
  return <h2 id="ticket-title" className="font-display text-3xl font-extrabold leading-[1.05] text-primary-text">{children}</h2>;
}
function TicketText({ children }: Children) {
  return <p className="text-muted">{children}</p>;
}
function TicketSteps() {
  return <>{bowlSteps.map((step, i) => {
    const count = stepOptions(step).length;
    return <div key={step.id} className="flex items-center gap-4 border-b-2 border-dashed border-rule py-5 last:border-0 md:flex-col md:items-start md:border-b-0 md:border-r-2 md:px-5 md:last:border-r-0">
      <span className="font-sign text-5xl font-extrabold leading-none text-broth-text" aria-hidden="true">0{i + 1}</span>
      <div>
        <h3 className="text-xl font-bold">{step.title}</h3>
        <p className="hand text-xl leading-tight text-primary-text" lang="vi">{step.vietnamese}</p>
        <p className="mt-1 text-sm text-muted">{count} to choose from</p>
      </div>
    </div>;
  })}</>;
}
export const BowlTicket = Object.assign(TicketRoot, { Lead: TicketLead, Heading: TicketHeading, Text: TicketText, Steps: TicketSteps });

/* ---------------- Visit ---------------- */

function VisitRoot({ children }: Children) {
  const { address } = business;
  const stall = address.unit.match(/\d+/)?.[0];
  return <section id="visit" aria-labelledby="visit-title" className="relative pt-16 sm:pt-20">
    <div className="wrap relative z-10 grid gap-10 lg:grid-cols-2 lg:items-start">
      <div className="canteen-card relative p-6 sm:p-8">
        {stall ? <StallPlate number={stall} className="absolute -top-8 right-5 w-24 rotate-3 sm:w-28" /> : null}
        {children}
        <address className="mt-6 flex gap-3 rounded-xl border border-rule bg-surface-warm/50 p-4 not-italic">
          <PinIcon className="mt-1 h-6 w-6 shrink-0 text-primary-text" />
          <span><strong>{address.unit}</strong><br />{address.street}<br />{address.locality}, {address.region} {address.postalCode}</span>
        </address>
        <p className="mt-4 text-muted">{address.directions}</p>
        <p className="mt-3"><a className="text-link font-semibold" href={mapDirectionsUrl(business.mapQuery)}>Get directions in Google Maps →</a></p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold">Opening hours</h3>
          <OpenStatus />
        </div>
        <HoursTable hours={business.hours} className="mt-3" />
        <TimeZoneNote />
      </div>

      <div className="relative">
        <div className="canteen-card overflow-hidden border-[3px] border-ink bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-primary px-5 py-3 text-on-primary">
            <span className="font-sign text-lg font-extrabold tracking-wide uppercase">Pike Place Market · Lower Level</span>
            <a href={mapDirectionsUrl(business.mapQuery)} className="text-sm font-semibold underline decoration-white/60 underline-offset-4 hover:decoration-white">Directions ↗</a>
          </div>
          <div className="relative min-h-[22rem] bg-tile-soft">
            {/* Illustrated Pike Place wayfinding backdrop visible while the map loads or if embeds are blocked */}
            <div className="tile-bg tile-faint absolute inset-0 flex flex-col justify-between p-6 text-ink" aria-hidden="true">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-ink/30 bg-surface px-3 py-1 text-xs font-bold uppercase tracking-wider">Below the Market Clock</span>
                <span className="hand text-xl text-primary-text">Follow the star anise</span>
              </div>
              <ol className="my-auto grid gap-3 rounded-xl border-2 border-dashed border-ink/25 bg-surface/92 p-4 text-sm sm:grid-cols-3">
                <li><strong className="block font-sign text-base text-primary-text">1. Pike St Entrance</strong>Enter under the red Public Market clock</li>
                <li><strong className="block font-sign text-base text-primary-text">2. Down One Level</strong>Take the ramp beside the main arcade</li>
                <li><strong className="block font-sign text-base text-chilli-text">3. Stall 14 Counter</strong>Green awning &amp; red plastic stools</li>
              </ol>
              <p className="text-xs text-muted">{address.street}, {address.locality}, {address.region} {address.postalCode}</p>
            </div>
            <GoogleMap address={business.mapQuery} title={`${business.name} at Pike Place Market`} className="relative z-10 h-full min-h-[22rem]" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-ink bg-surface-warm/70 py-3 pr-5 pl-28 text-sm font-medium sm:pl-34">
            <span>~30 stools + standing ledge</span>
            <span className="hand text-lg text-primary-text" lang="vi">Không đặt bàn · Walk-ins only</span>
          </div>
        </div>
        <StoolSide className="pointer-events-none relative -mt-8 -ml-2 w-28 drop-shadow-md sm:w-32" />
      </div>
    </div>
    <div aria-hidden="true" className="dado -mt-12 h-20 border-t-[3px] border-ink" />
  </section>;
}
function VisitHeading({ children }: Children) {
  return <>
    <p lang="vi" className="hand text-2xl text-primary-text">Ghé quán ăn phở</p>
    <h2 id="visit-title" className="mt-1 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-primary-text">{children}</h2>
  </>;
}
function VisitText({ children }: Children) {
  return <p className="mt-3 text-lg text-muted">{children}</p>;
}
export const Visit = Object.assign(VisitRoot, { Heading: VisitHeading, Text: VisitText });
