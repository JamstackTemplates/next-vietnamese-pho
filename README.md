# Phở Lá Xanh — Vietnamese canteen website

A static Next.js website for **Phở Lá Xanh**, a fresh, herb-green Vietnamese canteen at Pike Place Market:
phở, bánh mì and rice plates, a build-your-bowl guide and catering enquiries. This is a sample for the
Jamstacks gallery (template `next-vietnamese-pho`); every name, address, phone number and price is
fictitious. Replace them with your own before publishing.

Local development requires Node 24 or later and npm. Run `npm ci`, then `npm run dev` to preview.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero with open-now status, three menu boards, the broth clock, today's herb basket, the build-your-bowl ticket, and Visit (`/#visit`: address, directions, hours, map). Restaurant JSON-LD |
| `/menu/` | The full menu: phở board (small/large), bánh mì, cơm & bún, sides, drinks, dietary legend and allergen note. Menu JSON-LD |
| `/bowl/` | Interactive bowl builder (broth, noodles, protein, garnish) with a counter estimate, counter notes and an ordering phrasebook |
| `/contact/` | Catering and group-lunch enquiries: hosted Jamstacks form when configured, email always visible |
| `/404.html` | "This bowl's empty." |

## Everyday edits

| To change… | Edit |
| --- | --- |
| Mark a dish sold out | `content/menu.ts`: set the item's `available: false` (shows "Hết rồi · Sold out today" on Menu and Home) |
| A price | `content/menu.ts`: `price`, or `sizes: { small, large }` for phở (US dollars) |
| Add a dish | `content/menu.ts`: add an item to its section with a new unique `id` |
| An herb running out | `content/herbs.ts`: set `inBasket: false` (faded on Home, disabled in the builder) |
| Bowl options or surcharges | `content/bowl.ts`: `bowlBase`, each step's `options`, `included` and `extraPrice` |
| Opening hours | `content/business.ts`: `hours` (24-hour `HH:MM`, one interval per day, no overnight) |
| Phone, email, address, directions | `content/business.ts` |
| Contact page heading, intro and "Put these in your message" list | `content/business.ts`: `enquiries` |
| Page headings and copy | The page file: `app/page.tsx` (Home), `app/menu/page.tsx`, `app/bowl/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` |
| The broth clock steps | `app/page.tsx`: each `<BrothTimeline.Step time="4:00" title="Bones in">…</BrothTimeline.Step>` |
| Counter notes and phrasebook | `app/bowl/page.tsx` |

For example, change `<Hero.Heading>Broth on since 4 a.m. …</Hero.Heading>` in `app/page.tsx` to change
the Home headline. The components behind each name own the layout, styling and behaviour.

Run `npm test` after content edits. The content tests and the build fail with a message naming the item
to fix: duplicate or non-URL-safe IDs, prices outside $0–$40 (only `freeItems` such as the herb plate
may be $0), more than one signature dish per section, unknown dietary tags, missing defaults in the bowl
builder, or garnish herbs that are not in `content/herbs.ts`. Rename the business in `business.name`
and `site.config.json` `name`.

## File ownership

| File | Owns |
| --- | --- |
| `content/business.ts` | Name, contact details, address, map query, hours, enquiry copy |
| `content/menu.ts` | Menu sections, items, prices, sizes, dietary tags, availability, signature dishes, `freeItems` |
| `content/herbs.ts` | The herb basket (Home and the bowl builder's garnish step) |
| `content/bowl.ts` | Bowl builder steps, options, surcharges, base prices, default herbs |
| `lib/menu.ts`, `lib/bowl.ts`, `lib/hours.ts` | Validation, price formatting, builder totals and share links, open-now state |
| `lib/structured-data.ts` | Restaurant and Menu schema derived from content |
| `components/home.tsx`, `menu.tsx`, `bowl-builder.tsx`, `bowl-extras.tsx`, `contact.tsx`, `page-head.tsx` | Section markup, layout and behaviour |
| `components/art/` | Bespoke SVG artwork: the herb-plate bowl, hero counter, dishes, herbs, clock, stools, icons |
| `components/site-header.tsx`, `site-footer.tsx`, `dividers.tsx` | Shop-sign header, tiled footer, dividers |
| `app/tailwind.input.css` | Colour tokens (light, automatic dark, explicit dark), signboard, steel, plank wall, dado, gạch bông tile masks, tickets, boards, dish codes, motion, print |
| `app/sitemap.ts` | Public routes; add new pages here |
| `public/og.png` | 1200×630 social image |

## Design

"Gạch bông tiles and the herb plate", laid out like the canteen itself. The header is the shop fascia
with a hand-painted yellow signboard (red lettering, green border). Page heads are signboards on the cream
wall above a painted green dado. The hero, bowl builder and Contact sit on a brushed-steel counter with
everyday tableware: the green-rimmed melamine bowl, herb plate, sauce dish of hoisin and sriracha, iced tea,
chopstick tin, condiment caddy and a laminated menu. The Home menu boards hang on a green plank wall, and the
gạch bông cement tiles are the floor in the footer. Menus are set like a printed takeaway menu: dish codes
(P1, B2…), Vietnamese names in capitals, and section headings with a slightly off-register second ink.
Dark mode is the night canteen: dark steel, a glowing signboard and backlit boards. The signature element is
the top-down bowl beside its herb plate: the hero on Home and the drawing that redraws itself in the builder.

Dish codes come from each section's first letter and the item's position in `content/menu.ts`, so
reordering items renumbers them. Validation fails if two sections start with the same letter.

Fonts are self-hosted from npm (SIL Open Font License 1.1), latin and Vietnamese subsets only:
**Bungee Shade** and **Bungee Inline** (`@fontsource/bungee-shade`, `@fontsource/bungee-inline`) for the
painted signboards, **Bungee** (`@fontsource/bungee`) for section headings and codes, **Be Vietnam Pro**
(`@fontsource/be-vietnam-pro`, 400/500/700) for text, and **Patrick Hand** (`@fontsource/patrick-hand`) for
handwritten notes. All artwork is inline SVG; there are no photos or stock images. Steam, the open-now pulse
and the builder's fade are disabled under reduced motion. Print styles drop the tiles and keep the menu.

## Opening hours, open-now and the bowl builder

Hours live in `content/business.ts` and are shown in the business time zone (`site.config.json`
`timeZone`, `America/Los_Angeles`). The open-now pill and today's highlighted row are computed in the
browser and refresh every minute; static and no-JavaScript output says "See opening hours". Each day has
one same-day interval; overnight hours are rejected by validation.

The bowl builder never sends anything. Choices are kept in the URL hash (for example
`/bowl/#beef,banh-pho,tai+chin,thai-basil+lime,small`) so a guest can show their phone at the counter; the
total is labelled "Estimate to pay at the counter". Without JavaScript, the steps, options and surcharges
are still listed and the default bowl is drawn.

## Public configuration

```json
{
  "name": "Business name",
  "description": "Public description",
  "domain": "next-business-minimal.jamstacks.net",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

The starter itself leaves domain/timeZone unset. Gallery templates use their folder name plus
`.jamstacks.net`; customers replace the demo domain with their own. Do not invent canonical URLs when
the deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, content rules, optional opening hours,
and structured-data escaping. Typecheck uses Next's generated route types.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions and set its custom domain to the same value as site.config.json.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.
Do not add public/CNAME. Enable HTTPS after the certificate is ready. This starter performs no remote setup.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Optional maps require
`frame-src https://www.google.com`. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To publish a gallery template, create [its manifest](jamstacks/README.md) and capture
genuine screenshots before running its separate publishing test:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-type-style --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

Before publication: replace neutral content and shell; validate industry data/schema and all links;
choose licensed fonts; verify both themes/base-path/embed states; create a neutral 1200×630 public/og.png
from the finished design and wire metadata; replace the icon; generate gallery captures and validate;
confirm domain/Pages settings and HTTPS. No stock screenshot or OG image is supplied as if it were final.
