import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <section className="footer-cta section-shell">
        <p className="eyebrow">Start something worth noticing</p>
        <h2>Every project starts with a straight conversation.</h2>
        <div className="footer-cta-row">
          <p>Tell us what you&apos;re working on. We&apos;ll give you honest thinking on what we&apos;d do and why.</p>
          <Link href="/contact" className="button button-accent">
            Start a project <span className="icon-circle dark"><ArrowIcon diagonal /></span>
          </Link>
        </div>
      </section>

      <div className="footer-main section-shell">
        <div className="footer-brand">
          <Link href="/" className="brand-lockup footer-logo">
            <span className="brand-orbit" aria-hidden="true"><span /></span>
            <span>Orbisedg</span>
          </Link>
          <p>Strategy, creative, and digital performance for brands worth taking seriously.</p>
          <a className="footer-email" href="mailto:hello@orbisedg.com">hello@orbisedg.com</a>
        </div>

        <div className="footer-column">
          <p className="footer-label">Explore</p>
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-column service-links">
          <p className="footer-label">Capabilities</p>
          {services.slice(0, 5).map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>
          ))}
        </div>
      </div>

      <div className="footer-bottom section-shell">
        <p>© {new Date().getFullYear()} Orbisedg. All rights reserved.</p>
        <div>
          <Link href="/privacy">Privacy</Link>
          <span>Hyderabad, India</span>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">ORBISEDG</div>
    </footer>
  );
}
