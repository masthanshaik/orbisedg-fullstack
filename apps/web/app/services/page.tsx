import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Seven digital capabilities delivered to one standard: web development, UI/UX, SEO, paid media, social, content, and brand strategy.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Seven services. One standard." copy="Stand-alone capabilities. More powerful when they work together." />

      <section className="services-catalogue section-shell section-pad">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={(index % 3) * 70} className="catalogue-card">
            <Link href={`/services/${service.slug}`}>
              <div className="catalogue-image">
                <Image src={service.image} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i><ArrowIcon diagonal /></i>
              </div>
              <div className="catalogue-copy"><h2>{service.title}</h2><p>{service.tagline}</p></div>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="integrated-section section-pad">
        <div className="section-shell integrated-grid">
          <p className="eyebrow">Integrated engagements</p>
          <h2>One service solves a problem. The right combination changes the trajectory.</h2>
          <p>We scope around the outcome, not around internal departments. That may mean brand strategy flowing into a new website, or SEO working alongside content and paid acquisition.</p>
          <Link href="/contact" className="button button-accent">Discuss the right mix <span className="icon-circle dark"><ArrowIcon diagonal /></span></Link>
        </div>
      </section>
    </>
  );
}
