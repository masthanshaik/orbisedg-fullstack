import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy: string; children?: ReactNode }) {
  return (
    <section className="page-hero section-shell">
      <div className="page-hero-top">
        <p className="eyebrow">{eyebrow}</p>
        <p className="page-hero-index">Orbisedg / Digital growth studio</p>
      </div>
      <h1>{title}</h1>
      <div className="page-hero-bottom">
        <p>{copy}</p>
        {children}
      </div>
    </section>
  );
}
