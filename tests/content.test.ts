import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { herbs } from '../content/herbs.ts';
import { freeItems, menu, type MenuSection } from '../content/menu.ts';
import { boardHighlights, dishCodes, formatPrice, sectionById, validateHerbs, validateMenu } from '../lib/menu.ts';
import { businessStructuredData, jsonLd, menuStructuredData } from '../lib/structured-data.ts';

const clone = <T,>(value: T): T => structuredClone(value);
const withItem = (sectionId: string, itemId: string, change: Record<string, unknown>): MenuSection[] => clone(menu).map(section =>
  section.id !== sectionId ? section : { ...section, items: section.items.map(item => item.id === itemId ? { ...item, ...change } : item) });

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email'] as const) assert.ok(business[key].trim(), `business.${key}: required`);
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.usefulToInclude.length, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
});

test('enquiry copy never promises a confirmed booking, order or payment', () => {
  const copy = [business.enquiries.title, business.enquiries.introduction, ...business.enquiries.usefulToInclude].join(' ');
  assert.match(business.enquiries.introduction, /enquiry/i);
  assert.match(business.enquiries.introduction, /nothing is confirmed until/i);
  assert.doesNotMatch(copy, /\b(order online|book(ed|ing)? (a|your) table|reserve|(order|booking) is confirmed|payment)\b/i);
});

test('the shipped menu and herb basket are valid', () => {
  assert.doesNotThrow(() => validateMenu());
  assert.doesNotThrow(() => validateHerbs());
});

test('menu failures name the item to fix', () => {
  assert.throws(() => validateMenu(withItem('pho', 'pho-tai', { id: 'pho-chin' })), /"pho-chin" is used more than once/);
  assert.throws(() => validateMenu(withItem('pho', 'pho-tai', { id: 'Phở Tái' })), /"Phở Tái" must be lowercase/);
  assert.throws(() => validateMenu(withItem('banh-mi', 'banh-mi-ga', { price: 0 })), /item "banh-mi-ga" in "banh-mi" has price 0/);
  assert.throws(() => validateMenu(withItem('banh-mi', 'banh-mi-ga', { price: 105 })), /"banh-mi-ga".*price 105/);
  assert.throws(() => validateMenu(withItem('banh-mi', 'banh-mi-ga', { price: 10.555 })), /"banh-mi-ga"/);
  assert.throws(() => validateMenu(withItem('pho', 'pho-ga', { sizes: { small: 15, large: 13 } })), /"pho-ga".*large size/);
  assert.throws(() => validateMenu(withItem('pho', 'pho-ga', { price: 12 })), /"pho-ga".*either price or sizes/);
  assert.throws(() => validateMenu(withItem('pho', 'pho-tai', { signature: true })), /section "pho" has more than one signature/);
  assert.throws(() => validateMenu(withItem('drinks', 'tra-da', { tags: ['decaf'] })), /"tra-da" in "drinks" has unknown tag "decaf"/);
  assert.throws(() => validateMenu(withItem('drinks', 'tra-da', { vietnamese: ' ' })), /"tra-da".*vietnamese/);
  assert.throws(() => validateMenu(withItem('drinks', 'tra-da', { available: undefined })), /"tra-da" in "drinks" needs available/);
  assert.throws(() => validateMenu(menu, new Set(['rau-thom', 'free-noodles'])), /free item "free-noodles" is not on the menu/);
  assert.throws(() => validateMenu([...clone(menu), { ...clone(menu[3]), id: 'soups', items: [{ ...menu[3].items[0], id: 'canh-chua' }] }]), /sections "sides" and "soups" would share dish codes/);
  assert.ok(freeItems.has('rau-thom'));
  assert.equal(formatPrice(0), 'Free');
  assert.equal(formatPrice(13.5), '$13.50');
});

test('herb failures name the herb to fix', () => {
  assert.throws(() => validateHerbs([...herbs, { ...herbs[0] }]), /"thai-basil" is used more than once/);
  assert.throws(() => validateHerbs([{ ...herbs[0], vietnamese: '' }]), /"thai-basil" needs a vietnamese/);
});

test('dish codes are the section initial plus position', () => {
  const codes = dishCodes();
  assert.equal(codes.get('pho-dac-biet'), 'P1');
  assert.equal(codes.get('pho-chay'), 'P5');
  assert.equal(codes.get('banh-mi-op-la'), 'B5');
  assert.equal(codes.get('com-tam'), 'C1');
  assert.equal(codes.get('ca-phe-sua-da'), 'D1');
  assert.equal(new Set(codes.values()).size, codes.size);
});

test('Home menu boards show the signature dish and the next item in content order', () => {
  assert.deepEqual(boardHighlights(sectionById('pho')).map(item => item.id), ['pho-dac-biet', 'pho-tai']);
  assert.deepEqual(boardHighlights(sectionById('banh-mi')).map(item => item.id), ['banh-mi-thit', 'banh-mi-ga']);
  assert.deepEqual(boardHighlights(sectionById('com-bun')).map(item => item.id), ['com-tam', 'com-ga']);
});

test('owner edit: sold out and a new price flow through to boards and structured data', () => {
  const edited = withItem('banh-mi', 'banh-mi-thit', { available: false });
  const repriced = edited.map(section => section.id !== 'pho' ? section : { ...section, items: section.items.map(item => item.id === 'pho-tai' ? { ...item, sizes: { small: 13.5, large: 16.5 } } : item) });
  assert.doesNotThrow(() => validateMenu(repriced));
  const [thit] = boardHighlights(sectionById('banh-mi', repriced));
  assert.equal(thit.available, false);
  assert.equal(boardHighlights(sectionById('pho', repriced))[1].sizes?.large, 16.5);
});

test('structured data is derived from content and sold-out items are marked', () => {
  const restaurant = businessStructuredData();
  assert.equal(restaurant['@type'], 'Restaurant');
  assert.equal(restaurant.servesCuisine, 'Vietnamese');
  assert.equal(restaurant.openingHoursSpecification.length, 6, 'Monday is closed');
  assert.ok(restaurant.openingHoursSpecification.every(spec => spec.opens! < spec.closes!));
  const data = menuStructuredData();
  const items = data.hasMenuSection.flatMap(section => section.hasMenuItem);
  assert.equal(items.length, menu.reduce((sum, section) => sum + section.items.length, 0));
  const opLa = items.find(item => item.name.startsWith('Fried egg'))!;
  assert.equal(opLa.offers[0].availability, 'https://schema.org/SoldOut');
  assert.deepEqual(items.find(item => item.name.startsWith('House special'))!.offers.map(offer => offer.price), ['15.50', '18.50']);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
