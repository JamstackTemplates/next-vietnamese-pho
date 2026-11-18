// Shared business details for Phở Lá Xanh. Every page, the footer, metadata and structured data read
// from here, so change a phone number or opening time once in this file.
// Sample (fictitious) business for the Jamstacks gallery; replace with your own details.
import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Name without diacritics, for places that need plain ASCII (e.g. alt text fallbacks). */
  plainName: string;
  /** Short headline used in metadata and the social card. */
  tagline: string;
  /** Plain-text introduction used for fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public phone number as displayed; blank hides it. */
  phone: string;
  address: {
    /** Stall or unit, shown on its own line. */
    unit: string;
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    /** How to find the counter once you are at the landmark. */
    directions: string;
  };
  /** Search text for map links and the embedded map. */
  mapQuery: string;
  /** Seven entries, Monday first. One same-day interval per day; overnight hours are unsupported. */
  hours: OpeningHours[];
  /** Price band for structured data. */
  priceRange: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or order promises: enquiries are confirmed only by a reply. */
    introduction: string;
    /** Suggestions for the message text, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Phở Lá Xanh',
  plainName: 'Pho La Xanh',
  tagline: 'Herb-green phở, bánh mì and rice plates at Pike Place Market',
  introduction: 'A Vietnamese canteen at Pike Place Market: slow-simmered phở, bánh mì and broken-rice plates, with a basket of fresh herbs on every table and a build-your-own-bowl counter.',
  email: 'hello@pholaxanh.example',
  phone: '(206) 555-0148',
  address: {
    unit: 'Stall 14, lower level',
    street: 'Pike Place Market, 85 Pike St',
    locality: 'Seattle',
    region: 'WA',
    postalCode: '98101',
    country: 'US',
    directions: 'Come in at the Pike St entrance under the big clock, take the ramp down one level and follow the smell of star anise. We are the green counter with the red stools.',
  },
  mapQuery: 'Pike Place Market, 85 Pike St, Seattle, WA 98101',
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '10:30', closes: '20:30' },
    { day: 'Wednesday', opens: '10:30', closes: '20:30' },
    { day: 'Thursday', opens: '10:30', closes: '20:30' },
    { day: 'Friday', opens: '10:30', closes: '21:30' },
    { day: 'Saturday', opens: '10:30', closes: '21:30' },
    { day: 'Sunday', opens: '10:00', closes: '17:00' },
  ],
  priceRange: '$',
  enquiries: {
    title: 'Catering & group lunches',
    introduction: 'Planning an office lunch or a catering tray? Send us an enquiry and we’ll reply with what’s possible. Nothing is confirmed until we’ve written back.',
    usefulToInclude: [
      'The date and time you have in mind',
      'How many people',
      'Pickup or eating in at the counter',
      'Dishes or trays you’re interested in',
      'Any allergies or dietary needs',
      'A phone number if you’d like a call back',
    ],
  },
};
