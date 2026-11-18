import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
// Self-hosted fonts (SIL Open Font License 1.1). Latin + Vietnamese subsets only.
import '@fontsource/fraunces/latin-700.css';
import '@fontsource/fraunces/vietnamese-700.css';
import '@fontsource/fraunces/latin-700-italic.css';
import '@fontsource/fraunces/vietnamese-700-italic.css';
import '@fontsource/fraunces/latin-800.css';
import '@fontsource/fraunces/vietnamese-800.css';
import '@fontsource/fraunces/latin-900.css';
import '@fontsource/fraunces/vietnamese-900.css';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/vietnamese-700.css';
import '@fontsource/barlow-condensed/latin-800.css';
import '@fontsource/barlow-condensed/vietnamese-800.css';
import '@fontsource/be-vietnam-pro/latin-400.css';
import '@fontsource/be-vietnam-pro/vietnamese-400.css';
import '@fontsource/be-vietnam-pro/latin-500.css';
import '@fontsource/be-vietnam-pro/vietnamese-500.css';
import '@fontsource/be-vietnam-pro/latin-600.css';
import '@fontsource/be-vietnam-pro/vietnamese-600.css';
import '@fontsource/be-vietnam-pro/latin-700.css';
import '@fontsource/be-vietnam-pro/vietnamese-700.css';
import '@fontsource/patrick-hand/latin-400.css';
import '@fontsource/patrick-hand/vietnamese-400.css';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { site } from '../lib/site';
import './tailwind.input.css';

const title = `${business.name} — ${business.tagline}`;
const description = site.description || business.introduction;
// Absolute URLs only when the deployed URL is known at build time.
const socialImage = site.url ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${business.name}: a bowl of phở beside a plate of fresh herbs` }] : undefined;

export const metadata: Metadata = {
  title: { default: title, template: `%s — ${business.name}` },
  description,
  applicationName: site.name,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website', siteName: business.name, title, description, locale: 'en_US',
    ...(site.url ? { url: `${site.url}/` } : {}),
    ...(socialImage ? { images: socialImage } : {}),
  },
  twitter: { card: socialImage ? 'summary_large_image' : 'summary', title, description, ...(socialImage ? { images: socialImage.map(image => image.url) } : {}) },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6efe0' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1712' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning>
    <head><ThemeScript /></head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
    </ThemeProvider></body>
  </html>;
}
