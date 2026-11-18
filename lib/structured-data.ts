import { business } from '../content/business.ts';
import { menu } from '../content/menu.ts';
import { itemPrices } from './menu.ts';
import { absoluteUrl } from './paths.ts';

/** schema.org Restaurant derived from content/business.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const menuUrl = absoluteUrl('/menu/');
  const { address } = business;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    ...(url ? { image: `${url}og.png` } : {}),
    servesCuisine: 'Vietnamese',
    priceRange: business.priceRange,
    acceptsReservations: false,
    ...(menuUrl ? { hasMenu: menuUrl } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.unit}, ${address.street}`,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    openingHoursSpecification: business.hours.filter(entry => entry.opens && entry.closes).map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    })),
  };
}

/** schema.org Menu for /menu/, derived from content/menu.ts. Sold-out items are still on the menu. */
export function menuStructuredData() {
  const url = absoluteUrl('/menu/');
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${business.name} menu`,
    ...(url ? { url } : {}),
    inLanguage: 'en',
    hasMenuSection: menu.map(section => ({
      '@type': 'MenuSection',
      name: section.title,
      description: section.intro,
      hasMenuItem: section.items.map(item => ({
        '@type': 'MenuItem',
        name: `${item.name} (${item.vietnamese})`,
        description: item.description,
        ...(item.tags.includes('vegan') ? { suitableForDiet: 'https://schema.org/VeganDiet' }
          : item.tags.includes('vegetarian') ? { suitableForDiet: 'https://schema.org/VegetarianDiet' }
          : item.tags.includes('gluten-free') ? { suitableForDiet: 'https://schema.org/GlutenFreeDiet' } : {}),
        offers: itemPrices(item).map(price => ({
          '@type': 'Offer', price: price.toFixed(2), priceCurrency: 'USD',
          availability: item.available ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
        })),
      })),
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
