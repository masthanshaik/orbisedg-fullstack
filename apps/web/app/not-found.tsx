import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";

export default function NotFound() {
  return <section className="not-found section-shell"><p className="eyebrow">404 / Not found</p><h1>This page moved<br />without telling us.</h1><p>The page does not exist or the address has changed.</p><Link href="/" className="button button-accent">Back to home <span className="icon-circle dark"><ArrowIcon /></span></Link></section>;
}
