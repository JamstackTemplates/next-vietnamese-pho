'use client';
import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { openingState, openingText, type OpeningState } from '../lib/hours';
import { site } from '../lib/site';
import { SiteLink } from './site-link';

/**
 * Open-now pill. Static and no-JS output is the neutral "See opening hours"; the browser computes
 * the state in the business time zone (site.config.json timeZone) and refreshes it every minute.
 */
export function OpenStatus({ tone = 'surface', className = '' }: { tone?: 'surface' | 'band'; className?: string }) {
  const [state, setState] = useState<OpeningState>({ state: 'unknown' });
  useEffect(() => {
    const update = () => setState(openingState(business.hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);
  const dot = state.state === 'open' ? 'bg-lime ring-tile' : state.state === 'closed' ? 'bg-chilli ring-chilli/30' : 'bg-muted ring-rule';
  const surface = tone === 'band' ? 'border-band-ink/40 bg-band text-band-ink' : 'border-ink bg-surface text-ink';
  return <SiteLink href="/#visit" data-state={state.state}
    className={`inline-flex min-h-10 items-center gap-2.5 rounded-full border-2 px-3.5 py-1 text-sm font-semibold no-underline hover:underline ${surface} ${className}`}>
    <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ring-4 ${dot} ${state.state === 'open' ? 'motion-safe:animate-pulse' : ''}`} />
    <span aria-live="polite">{openingText(state)}</span>
  </SiteLink>;
}
