"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand-lockup" aria-label="Orbisedg home">
          <span className="brand-orbit" aria-hidden="true"><span /></span>
          <span>Orbisedg</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={active ? "active" : ""}>
                {link.label}<i aria-hidden="true" />
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="nav-cta">
          <span>Get in touch</span>
          <span className="icon-circle"><ArrowIcon diagonal /></span>
        </Link>

        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} style={{ transitionDelay: `${index * 45}ms` }}>
              <span>{String(index + 1).padStart(2, "0")}</span>{link.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-bottom">
          <a href="mailto:hello@orbisedg.com">hello@orbisedg.com</a>
          <p>Hyderabad · Bangalore · India & beyond</p>
        </div>
      </div>
    </header>
  );
}
