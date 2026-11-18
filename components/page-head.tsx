import type { ReactNode } from 'react';

type Children = { children: ReactNode };

/**
 * Inner-page heading: a hand-painted Saigon signboard against faint gạch bông tiles,
 * a Vietnamese kicker in marker, and a dish vignette standing on the painted green dado.
 */
function PageHeadRoot({ children, art }: Children & { art?: ReactNode }) {
  return <header className="tile-bg tile-faint relative mb-16 overflow-x-clip">
    <div className="wrap relative grid items-end gap-6 pt-10 md:grid-cols-[minmax(0,1fr)_auto] md:pt-14">
      <div className="relative z-10 pb-10 md:pb-12">{children}</div>
      {art ? <div className="pointer-events-none relative z-10 -mb-6 ml-auto w-44 drop-shadow-xl sm:w-56 md:w-72">{art}</div> : null}
    </div>
    <div aria-hidden="true" className="dado h-12 border-y-[3px] border-ink md:h-14" />
  </header>;
}

function Kicker({ children }: Children) {
  return <p lang="vi" className="hand mb-3 inline-flex items-center gap-2 rounded-full border border-rule bg-surface/90 px-3.5 py-0.5 text-xl text-primary-text">{children}</p>;
}

function Title({ children, id }: Children & { id?: string }) {
  return <h1 id={id} className="signboard block w-fit max-w-full px-6 py-3.5 font-sign text-[clamp(2.2rem,6vw,4.3rem)] font-extrabold uppercase leading-[.96] tracking-wide sm:px-8">{children}</h1>;
}

function Lede({ children }: Children) {
  return <div className="mt-7 max-w-(--measure) text-[clamp(1.05rem,1.6vw,1.2rem)] text-ink">{children}</div>;
}

export const PageHead = Object.assign(PageHeadRoot, { Kicker, Title, Lede });
