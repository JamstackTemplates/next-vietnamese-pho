import type { Metadata } from 'next';
import { TiffinArt } from '../../components/art/dishes';
import { Contact } from '../../components/contact';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = { title: 'Contact', description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') } };

export default function ContactPage() {
  return <>
    <PageHead art={<TiffinArt className="w-full" title="A stacked tiffin carrier and a catering tray of summer rolls" />}>
      <PageHead.Kicker>Liên hệ</PageHead.Kicker>
      <PageHead.Title>{business.enquiries.title}</PageHead.Title>
      <PageHead.Lede>
        <p>{business.enquiries.introduction}</p>
        <p className="mt-2 text-muted">
          We take catering trays (summer rolls, bánh mì platters, phở kits for the office), group lunches of ten
          or more, and allergen or ingredient questions. There are no table bookings: the counter is walk-in only.
        </p>
      </PageHead.Lede>
    </PageHead>

    <Contact>
      <Contact.Form heading="Send an enquiry">
        <p className="font-semibold">Email us your enquiry</p>
        <p className="mt-2 text-muted">
          Write to us at the address below with the details listed alongside. We read every message and reply
          with what’s possible; nothing is arranged until you hear back.
        </p>
      </Contact.Form>
      <Contact.Aside>
        <Contact.Include heading="Put these in your message" />
        <Contact.Direct heading="Or write to us directly" />
        <Contact.VisitBlock heading="Just hungry?">Walk in during opening hours.</Contact.VisitBlock>
      </Contact.Aside>
    </Contact>
  </>;
}
