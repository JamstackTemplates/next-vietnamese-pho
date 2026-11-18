import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { BasilMark } from './art/icons';
import { MobileNav } from './mobile-nav';
import { OpenStatus } from './open-status';
import { SiteLink } from './site-link';

const links = [
  { href: '/menu/', label: 'Menu' },
  { href: '/bowl/', label: 'Build a bowl' },
  { href: '/#visit', label: 'Visit' },
  { href: '/contact/', label: 'Contact' },
];

/** Painted Saigon shopfront bar: enamel wordmark plate, navigation, status pill and gạch bông tile trim. */
export function SiteHeader() {
  const navLinks = links.map(link => <SiteLink key={link.href} href={link.href} markCurrent={link.href.includes('#') ? undefined : 'page'}>{link.label}</SiteLink>);
  return <header className="relative z-40 bg-surface/95 backdrop-blur-sm">
    <div className="wrap flex min-h-[4.75rem] items-center justify-between gap-3 py-2.5">
      <SiteLink href="/" className="group flex items-center gap-2.5 no-underline hover:no-underline">
        <BasilMark className="hidden h-8 w-8 shrink-0 min-[400px]:block transition-transform group-hover:-rotate-12" />
        <span className="signboard signboard-compact whitespace-nowrap px-3.5 py-1.5 font-sign text-lg font-extrabold leading-none tracking-wider sm:px-4 sm:py-2 sm:text-xl">
          {business.name.toUpperCase()}
        </span>
      </SiteLink>
      <nav aria-label="Main" className="hidden items-center gap-1 font-semibold md:flex [&_a]:rounded-full [&_a]:px-3.5 [&_a]:py-2 [&_a:hover]:bg-tile-soft [&_a:hover]:no-underline">
        {navLinks}
      </nav>
      <div className="flex items-center gap-2.5">
        <span className="hidden xl:block"><OpenStatus /></span>
        <DarkModeToggle />
        <MobileNav>{navLinks}</MobileNav>
      </div>
    </div>
    <div aria-hidden="true" className="border-y-2 border-ink bg-tile-soft">
      <div className="tile-strip" />
    </div>
  </header>;
}
