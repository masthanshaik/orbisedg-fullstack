import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Orbisedg, a founder-led digital studio combining strategy, creative, technology, and performance from one team.",
};

const principles = [
  ["The details shape everything", "Every touchpoint shapes how the business is perceived. The copy, the site, the campaigns. Quality lives in the detail."],
  ["Strategy without execution is just theory", "We do the strategy and the work, without handing either off."],
  ["Fewer handoffs, better work", "Fewer handoffs means less dilution between the thinking and what actually ships."],
  ["Built to outlast the brief", "Websites, content systems, search structure. Built to keep generating value after launch, not just to tick the delivery box."],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The digital studio for businesses that refuse to settle for average."
        copy="Strategy, creative, and execution from one team. Based in Hyderabad, working with brands across India."
      >
        <Link href="/contact" className="button button-accent">Work with us <span className="icon-circle dark"><ArrowIcon diagonal /></span></Link>
      </PageHero>

      <section className="about-image-band">
        <Image src="/images/editorial-about.jpg" alt="Orbisedg creative workspace" fill priority sizes="100vw" />
        <div className="about-image-caption section-shell"><span>Hyderabad / India</span><span>Founder-led / Independent</span></div>
      </section>

      <section className="section-shell section-pad about-statement">
        <Reveal>
          <p className="eyebrow">What we stand for</p>
          <div className="about-statement-grid">
            <h2>Most businesses deserve better digital work than they&apos;re getting.</h2>
            <p>We&apos;re here for the ones doing something about it. Strategy, design, and execution that reflects the quality of the business. No agency theatre. No filler.</p>
          </div>
        </Reveal>
      </section>

      <section className="about-principles section-pad">
        <div className="section-shell">
          <div className="section-heading-row">
            <div><p className="eyebrow">Our approach</p><h2>We&apos;re not here to keep the brand busy.<br />We&apos;re here to make it better.</h2></div>
          </div>
          <div className="principle-list">
            {principles.map(([title, text], index) => (
              <Reveal key={title} delay={index * 70} className="principle-row">
                <span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-pad founder-led">
        <div className="founder-led-image"><Image src="/images/editorial-contact.jpg" alt="Orbisedg working session" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
        <Reveal className="founder-led-copy">
          <p className="eyebrow">Founder-led</p>
          <h2>You talk to the people doing the work.</h2>
          <p>No account-manager relay and no briefing chain. The person listening on the kickoff call is involved in the work that ships, which keeps the original intent intact.</p>
          <Link href="/contact" className="text-link">Start a conversation <ArrowIcon /></Link>
        </Reveal>
      </section>
    </>
  );
}
