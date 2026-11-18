import type { Metadata } from 'next';
import { EmptyBowlArt } from '../components/art/dishes';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return <section aria-labelledby="nf-title" className="teak border-y-[3px] border-ink py-16">
    <div className="wrap flex flex-col items-center text-center">
      <div className="canteen-card w-full max-w-md p-6 sm:p-10">
        <EmptyBowlArt className="mx-auto w-64" title="An empty phở bowl tipped on its side, one noodle and a basil leaf left" />
        <h1 id="nf-title" className="mt-4 font-display text-[clamp(2rem,6vw,3.1rem)] font-extrabold leading-none text-primary-text">This bowl’s empty.</h1>
        <p className="hand mt-3 text-2xl text-muted">Even the broth needs a minute.</p>
        <p className="mt-3">The page you were after isn’t here. Try the menu, or head back to the counter.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <SiteLink href="/menu/" className="button">See the menu</SiteLink>
          <SiteLink href="/" className="button button-quiet">Back home</SiteLink>
        </div>
      </div>
    </div>
  </section>;
}
