import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected Orbisedg engagements across fintech, agency repositioning, and luxury e-commerce growth.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Selected work" title="Work that proves the point." copy="A sample of the standard in practice — strategy, design, technology, and growth measured by what changed." />
      <section className="work-index section-shell section-pad">
        {caseStudies.map((study, index) => (
          <Reveal key={study.slug} className="work-index-card" delay={index * 90}>
            <Link href={`/work/${study.slug}`}>
              <div className="work-index-image"><Image src={study.image} alt="" fill sizes="(max-width: 800px) 100vw, 55vw" /><span>0{index + 1}</span><i><ArrowIcon diagonal /></i></div>
              <div className="work-index-copy"><p className="small-label">Case study</p><h2>{study.title}</h2><p>{study.excerpt}</p><div className="metric-row">{study.metrics.map((metric) => <span key={metric.label}><strong>{metric.value}</strong>{metric.label}</span>)}</div></div>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
