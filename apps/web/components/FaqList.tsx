import type { FaqItem } from "@/lib/content";

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.q} className="faq-item">
          <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.q}<i aria-hidden="true" /></summary>
          <div><p>{item.a}</p></div>
        </details>
      ))}
    </div>
  );
}
