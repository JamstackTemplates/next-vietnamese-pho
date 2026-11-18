import { business } from '../content/business';
import { hoursSummary } from '../lib/hours';
import { ChopstickDivider } from './dividers';
import { BasilMark, MailIcon, PhoneIcon, PinIcon } from './art/icons';
import { SiteLink } from './site-link';

/** A cream counter edge over a band of gạch bông tiles, holding the address, hours and contacts. */
export function SiteFooter() {
  const { address } = business;
  return <footer>
    <div className="h-4 border-t-[3px] border-ink bg-surface shadow-[0_6px_0_var(--rule)]" aria-hidden="true" />
    <div className="tile-bg py-14">
      <div className="wrap">
        <div className="canteen-card p-6 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-3 font-sign text-2xl font-extrabold tracking-wide text-primary-text sm:text-3xl"><BasilMark className="h-9 w-9" />{business.name.toUpperCase()}</p>
            <p className="hand text-2xl text-muted" lang="vi">Cảm ơn! <span lang="en">See you at the counter.</span></p>
          </div>
          <ChopstickDivider className="my-6" />
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-2 flex items-center gap-2 font-bold"><PinIcon className="h-5 w-5 text-primary-text" />Find us</h2>
              <p>{address.unit}<br />{address.street}<br />{address.locality}, {address.region} {address.postalCode}</p>
              <SiteLink href="/#visit" className="text-link mt-1.5 inline-block">Directions & map</SiteLink>
            </div>
            <div>
              <h2 className="mb-2 font-bold">Hours</h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 tabular">
                {hoursSummary(business.hours).map(row => <div key={row.days} className="contents"><dt className="font-semibold">{row.days}</dt><dd>{row.time}</dd></div>)}
              </dl>
            </div>
            <div>
              <h2 className="mb-2 font-bold">Say hello</h2>
              <p className="flex items-center gap-2"><MailIcon className="h-4 w-4 shrink-0 text-primary-text" /><a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a></p>
              {business.phone ? <p className="mt-1 flex items-center gap-2"><PhoneIcon className="h-4 w-4 shrink-0 text-primary-text" /><a className="text-link" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a></p> : null}
              <p className="mt-2"><SiteLink href="/contact/" className="text-link">Catering & group lunches</SiteLink></p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-3 rounded-xl border border-rule bg-surface/95 px-4 py-2.5 text-sm text-muted">
          <p>Walk-ins only · order at the counter</p>
          <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="hover:text-primary-text hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
        </div>
      </div>
    </div>
  </footer>;
}
