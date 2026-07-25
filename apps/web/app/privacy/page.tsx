import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy." copy="How Orbisedg handles information submitted through this website." />
      <article className="legal-copy section-shell section-pad">
        <h2>Information we collect</h2><p>When you submit the contact form, we collect the details you provide, including your name, email address, company, website, service interest, budget range, and project message.</p>
        <h2>How we use it</h2><p>We use this information to assess and respond to your enquiry, communicate about a potential engagement, prevent abuse, and improve how the website works.</p>
        <h2>Storage and access</h2><p>Enquiries are stored in a secured PostgreSQL database and are accessible only to authorised Orbisedg team members and service providers required to operate the website.</p>
        <h2>Retention</h2><p>We keep enquiry information only for as long as reasonably necessary for business communication, legal obligations, and record keeping.</p>
        <h2>Your choices</h2><p>You may request access, correction, or deletion of your submitted information by emailing hello@orbisedg.com.</p>
        <h2>Updates</h2><p>This policy may be updated as the website and its services evolve. The published version on this page is the current version.</p>
      </article>
    </>
  );
}
