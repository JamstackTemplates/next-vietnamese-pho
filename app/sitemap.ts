import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../lib/paths';
export const dynamic = 'force-static';
/** Public routes. Add new pages here. */
const ROUTES = ['/', '/menu/', '/bowl/', '/contact/'];
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
