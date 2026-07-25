import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Reveal } from "@/components/Reveal";
import { caseStudies, getCaseStudy } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.excerpt };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const index = caseStudies.findIndex((item) => item.slug === slug);
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <section className="case-hero section-shell">
        <div><p className="eyebrow">Case study / 0{index + 1}</p><Link href="/work" className="back-link">All work</Link></div>
        <h1>{study.title}</h1><p>{study.excerpt}</p>
      </section>
      <section className="case-hero-image"><Image src={study.image} alt={`${study.title} case study`} fill priority sizes="100vw" /></section>

      <section className="case-metrics section-shell">
        {study.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
      </section>

      <section className="case-story section-shell section-pad">
        {Object.entries(study.sections).map(([heading, text], sectionIndex) => <Reveal key={heading} delay={sectionIndex * 80} className="case-story-row"><span>{String(sectionIndex + 1).padStart(2, "0")}</span><h2>{heading}</h2><p>{text}</p></Reveal>)}
      </section>

      <section className="case-quote section-pad"><Reveal className="section-shell"><span>“</span><blockquote>{study.testimonial.quote}</blockquote><p>— {study.testimonial.author}</p></Reveal></section>

      {nextStudy && <section className="next-project section-shell section-pad"><p className="eyebrow">Next project</p><Link href={`/work/${nextStudy.slug}`}><span>{nextStudy.title}</span><i><ArrowIcon diagonal /></i></Link></section>}
    </>
  );
}
