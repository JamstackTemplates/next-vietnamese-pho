// Contact page body: the hosted enquiry form (or the email fallback) on a counter ticket, a
// handwritten "what to include" list, the always-visible email and phone, and a small visit block.
import type { ReactNode } from 'react';
import { business } from '../content/business';
import { hoursSummary } from '../lib/hours';
import { site } from '../lib/site';
import { MailIcon, PhoneIcon, PinIcon } from './art/icons';
import { CopyEmail } from './copy-email';
import { JamstacksSupportForm } from './jamstacks-support-form';
import { OpenStatus } from './open-status';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };

function ContactRoot({ children }: Children) {
  return <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">{children}</div>;
}

/** Hosted form when a Jamstacks site ID is configured; otherwise the children explain the email fallback. */
function Form({ heading, children }: Children & { heading: ReactNode }) {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <section aria-labelledby="form-title" className="ticket-shadow">
    <div className="ticket px-5 py-10 sm:px-8">
      <h2 id="form-title" className="font-display text-3xl font-extrabold text-primary-text">{heading}</h2>
      <div className="mt-5">
        {hosted ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
          : <div className="rounded-xl border-2 border-dashed border-rule bg-surface-warm/45 p-5">{children}
            <p className="mt-4"><a className="button max-w-full wrap-anywhere" href={`mailto:${business.email}`}><MailIcon className="h-5 w-5" />Email {business.email}</a></p>
          </div>}
      </div>
    </div>
  </section>;
}

function Aside({ children }: Children) {
  return <aside aria-label="Contact details" className="grid content-start gap-8">{children}</aside>;
}

function Include({ heading }: { heading: ReactNode }) {
  return <section aria-labelledby="include-title" className="relative rounded-sm sm:rotate-1 bg-[#fff8cf] p-6 text-[#2b2414] shadow-[0_14px_20px_-10px_rgb(0_0_0/.45)]">
    <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#7a1d17] bg-chilli shadow" />
    <h2 id="include-title" className="hand mt-2 text-3xl">{heading}</h2>
    <ul className="mt-3 grid gap-1.5">
      {business.enquiries.usefulToInclude.map(tip => <li key={tip} className="hand flex items-start gap-2 text-xl leading-snug">
        <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M5 10l3 3 7-8" fill="none" stroke="#185e37" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {tip}
      </li>)}
    </ul>
  </section>;
}

function Direct({ heading }: { heading: ReactNode }) {
  return <section aria-labelledby="direct-title" className="canteen-card p-6">
    <h2 id="direct-title" className="text-xl font-bold">{heading}</h2>
    <p className="mt-3 flex items-center gap-2 text-lg"><MailIcon className="h-5 w-5 shrink-0 text-primary-text" /><a className="text-link wrap-anywhere font-semibold" href={`mailto:${business.email}`}>{business.email}</a></p>
    <div className="mt-2 flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
    {business.phone ? <p className="mt-3 flex items-center gap-2 text-lg"><PhoneIcon className="h-5 w-5 shrink-0 text-primary-text" /><a className="text-link font-semibold" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a></p> : null}
  </section>;
}

function VisitBlock({ heading, children }: Children & { heading: ReactNode }) {
  const { address } = business;
  return <section aria-labelledby="visit-mini-title" className="teak overflow-hidden rounded-2xl border-2 border-ink p-2.5 shadow-md">
    <div className="rounded-xl bg-surface p-5">
      <h2 id="visit-mini-title" className="text-xl font-bold">{heading}</h2>
      <p className="mt-2 flex gap-2"><PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-text" /><span>{address.unit}<br />{address.street}<br />{address.locality}, {address.region} {address.postalCode}</span></p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 text-sm tabular">
        {hoursSummary(business.hours).map(row => <div key={row.days} className="contents"><dt className="font-semibold">{row.days}</dt><dd>{row.time}</dd></div>)}
      </dl>
      <div className="mt-4"><OpenStatus /></div>
      <p className="mt-3 text-sm text-muted">{children} <SiteLink href="/#visit" className="text-link">Map and directions</SiteLink></p>
    </div>
  </section>;
}

export const Contact = Object.assign(ContactRoot, { Form, Aside, Include, Direct, VisitBlock });
