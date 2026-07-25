import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Orbisedg what you are building, changing, or trying to improve. Every project starts with a straight conversation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Every project starts with a straight conversation." copy="Tell us what you're working on. We'll give you honest thinking on what we'd do and why." />
      <section className="contact-layout section-shell section-pad">
        <div className="contact-aside">
          <div className="contact-image"><Image src="/images/editorial-contact.jpg" alt="Orbisedg studio" fill sizes="(max-width: 800px) 100vw, 36vw" /></div>
          <div className="contact-details"><p className="small-label">Email</p><a href="mailto:hello@orbisedg.com">hello@orbisedg.com</a><p className="small-label">Based in</p><p>Hyderabad, India<br />Working across India & beyond</p><p className="small-label">Typical response</p><p>Within two business days</p></div>
        </div>
        <div><p className="eyebrow">Project enquiry</p><h2>Give us the useful context.</h2><p className="contact-intro">A few specific details help us come back with a useful response instead of a generic sales reply.</p><ContactForm /></div>
      </section>
    </>
  );
}
