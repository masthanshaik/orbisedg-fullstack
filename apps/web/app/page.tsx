import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";
import { caseStudies, generalFaqs, processSteps, services, testimonials } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="home-hero section-shell">
        <div className="hero-kicker"><span /> Founder-led digital agency</div>
        <div className="hero-title-wrap">
          <h1>
            <span>Strategy that</span>
            <span className="hero-title-indent">moves brands</span>
          </h1>
          <div className="hero-arch">
            <Image src="/images/editorial-home-hero.jpg" alt="Orbisedg team workspace" fill priority sizes="(max-width: 800px) 70vw, 38vw" />
            <span className="hero-star" aria-hidden="true">✦</span>
          </div>
        </div>
        <div className="hero-bottom">
          <p>Strategy, design, and execution from the same team.<br />Nothing handed off. Nothing watered down.</p>
          <div className="hero-actions">
            <Link href="/contact?intent=discovery-call" className="button button-accent">Book a Discovery Call <span className="icon-circle dark"><ArrowIcon diagonal /></span></Link>
            <Link href="/contact" className="button button-outline">Start a Project <span className="icon-circle accent"><ArrowIcon diagonal /></span></Link>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span className="orbit-dot" /></div>
      </section>

      <div className="location-strip">
        <span>Hyderabad</span><span>Bangalore</span><span>India & beyond</span><span>Built for ambitious businesses</span>
      </div>

      <section className="marquee-section" aria-label="Capabilities">
        <div className="marquee-track">
          {[...services, ...services].map((service, index) => (
            <span key={`${service.slug}-${index}`}>{service.title}<i /></span>
          ))}
        </div>
      </section>

      <section className="section-shell intro-statement section-pad">
        <Reveal>
          <p className="eyebrow">The studio</p>
          <h2>When the business has outgrown <em>average</em> digital work.</h2>
          <div className="statement-bottom">
            <p>Orbisedg brings strategy, creative, technology, and performance together under one roof, so the thinking survives all the way to what ships.</p>
            <Link href="/about" className="text-link">About Orbisedg <ArrowIcon /></Link>
          </div>
        </Reveal>
      </section>

      <section className="work-section section-pad">
        <div className="section-shell">
          <div className="section-heading-row">
            <div><p className="eyebrow">Selected work</p><h2>Work that proves<br />the point.</h2></div>
            <Link href="/work" className="button button-outline">View all work <span className="icon-circle accent"><ArrowIcon diagonal /></span></Link>
          </div>

          <div className="work-grid">
            {caseStudies.map((study, index) => (
              <Reveal key={study.slug} delay={index * 90} className={index === 0 ? "work-card featured" : "work-card"}>
                <Link href={`/work/${study.slug}`}>
                  <div className="work-image">
                    <Image src={study.image} alt="" fill sizes={index === 0 ? "(max-width: 800px) 100vw, 66vw" : "(max-width: 800px) 100vw, 33vw"} />
                    <span className="work-number">0{index + 1}</span>
                    <span className="work-arrow"><ArrowIcon diagonal /></span>
                  </div>
                  <div className="work-meta"><span>{study.title}</span><span>{study.metrics[0]?.value} {study.metrics[0]?.label}</span></div>
                  <p>{study.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section section-pad section-shell">
        <div className="section-heading-row services-heading">
          <div><p className="eyebrow">Capabilities</p><h2>One team. Every discipline<br />the brand needs.</h2></div>
          <p>Each service delivers on its own. Together, they compound.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 40}>
              <Link className="service-row" href={`/services/${service.slug}`}>
                <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.tagline}</p>
                <span className="service-arrow"><ArrowIcon diagonal /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="why-section section-pad">
        <div className="section-shell why-grid">
          <Reveal className="why-copy">
            <p className="eyebrow">Why Orbisedg</p>
            <h2>Most digital agencies are either thinkers or doers. <em>We&apos;re both.</em></h2>
            <p>Same desk. Same people. Same standard across the strategy and the work.</p>
          </Reveal>
          <div className="why-image">
            <Image src="/images/editorial-about.jpg" alt="Creative strategy session" fill sizes="(max-width: 800px) 100vw, 42vw" />
            <span className="image-stamp">ORBISEDG<br />EST. HYD</span>
          </div>
        </div>
        <div className="section-shell value-grid">
          {[
            ["Strategy and execution, together", "The same people who define the direction are the ones building the work. No handoff. No dilution."],
            ["You talk to the people doing the work", "No account manager relay, no briefing chain. The person on your kickoff call is the person shipping."],
            ["Built to outlast the brief", "Assets, content systems, and digital infrastructure built to keep generating value. Not just to perform during the campaign."],
          ].map(([title, text], index) => (
            <Reveal key={title} delay={index * 100} className="value-card">
              <span>0{index + 1}</span><h3>{title}</h3><p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="process-section section-pad section-shell">
        <div className="section-heading-row">
          <div><p className="eyebrow">How we work</p><h2>Four stages.<br />No surprises.</h2></div>
          <p>Scoped at the start. Delivered as agreed. No surprises in between.</p>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 90} className="process-card">
              <span>{step.number}</span><div className="process-line" /><h3>{step.title}</h3><p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="testimonial-section section-pad">
        <div className="section-shell">
          <p className="eyebrow">What clients say</p>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.author} delay={index * 120} className="testimonial-card">
                <span className="quote-mark">“</span><blockquote>{testimonial.quote}</blockquote><p>— {testimonial.author}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section section-pad section-shell">
        <div className="faq-layout">
          <div><p className="eyebrow">Questions, answered</p><h2>Before we<br />get started.</h2></div>
          <FaqList items={generalFaqs} />
        </div>
      </section>
    </>
  );
}
