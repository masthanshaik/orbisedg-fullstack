import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/ArrowIcon";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";
import { getService, services } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.tagline };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const serviceIndex = services.findIndex((item) => item.slug === slug);

  return (
    <>
      <section className="service-detail-hero section-shell">
        <div className="service-detail-top"><p className="eyebrow">Service / {String(serviceIndex + 1).padStart(2, "0")}</p><Link href="/services" className="back-link">All services</Link></div>
        <h1>{service.title}</h1>
        <div className="service-detail-bottom"><p>{service.tagline}</p><Link href="/contact" className="button button-accent">Discuss this service <span className="icon-circle dark"><ArrowIcon diagonal /></span></Link></div>
      </section>

      <section className="service-detail-image"><Image src={service.image} alt={`${service.title} by Orbisedg`} fill priority sizes="100vw" /></section>

      <section className="section-shell section-pad service-overview">
        <Reveal className="service-overview-main"><p className="eyebrow">Overview</p><h2>{service.overview}</h2></Reveal>
        <Reveal className="service-audience"><p className="small-label">Who it&apos;s for</p><p>{service.audience}</p></Reveal>
      </section>

      <section className="deliverables-section section-pad">
        <div className="section-shell deliverables-grid">
          <div><p className="eyebrow">What&apos;s included</p><h2>Clear outputs.<br />No vague retainers.</h2></div>
          <div className="deliverable-list">
            {service.deliverables.map((item, index) => <Reveal key={item} delay={index * 60} className="deliverable-item"><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section-shell section-pad detailed-process">
        <div className="section-heading-row"><div><p className="eyebrow">The process</p><h2>How the work moves.</h2></div></div>
        <div className="detailed-process-grid">
          {service.process.map((step, index) => <Reveal key={step.title} delay={index * 55} className="detailed-process-card"><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.desc}</p></Reveal>)}
        </div>
      </section>

      <section className="faq-section section-pad section-shell">
        <div className="faq-layout"><div><p className="eyebrow">Service FAQ</p><h2>What you&apos;ll<br />want to know.</h2></div><FaqList items={service.faqs} /></div>
      </section>
    </>
  );
}
