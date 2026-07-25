"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/content";
import { ArrowIcon } from "./ArrowIcon";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, FormDataEntryValue | boolean> = Object.fromEntries(formData.entries());
    payload.consent = formData.get("consent") === "on";

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string; error?: string; details?: Record<string, string[]> };
      if (!response.ok) {
        const firstValidationError = data.details ? Object.values(data.details).flat()[0] : undefined;
        throw new Error(firstValidationError ?? data.error ?? "The enquiry could not be sent.");
      }

      setState("success");
      setMessage(data.message ?? "Thanks — your enquiry has been received.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please email hello@orbisedg.com.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label>Website field<input type="text" name="websiteField" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="form-grid two-columns">
        <label>
          <span>Name *</span>
          <input name="name" type="text" required minLength={2} autoComplete="name" placeholder="Your name" />
        </label>
        <label>
          <span>Work email *</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        </label>
      </div>

      <div className="form-grid two-columns">
        <label>
          <span>Company</span>
          <input name="company" type="text" autoComplete="organization" placeholder="Company name" />
        </label>
        <label>
          <span>Website</span>
          <input name="website" type="url" inputMode="url" placeholder="https://" />
        </label>
      </div>

      <div className="form-grid two-columns">
        <label>
          <span>What do you need?</span>
          <select name="service" defaultValue="">
            <option value="">Select a service</option>
            {services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
            <option value="Integrated engagement">A combination of services</option>
          </select>
        </label>
        <label>
          <span>Indicative budget</span>
          <select name="budget" defaultValue="">
            <option value="">Select a range</option>
            <option value="Under £5,000">Under £5,000</option>
            <option value="£5,000–£15,000">£5,000–£15,000</option>
            <option value="£15,000–£30,000">£15,000–£30,000</option>
            <option value="£30,000+">£30,000+</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
      </div>

      <label>
        <span>Tell us about the project *</span>
        <textarea name="message" required minLength={20} rows={7} placeholder="What are you building, changing, or trying to improve?" />
      </label>

      <label className="consent-row">
        <input type="checkbox" name="consent" required />
        <span>I agree that Orbisedg may use these details to respond to this enquiry.</span>
      </label>

      <div className="form-submit-row">
        <button className="button button-accent" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Send enquiry"}
          <span className="icon-circle dark"><ArrowIcon diagonal /></span>
        </button>
        {message && <p className={`form-status ${state}`} role="status">{message}</p>}
      </div>
    </form>
  );
}
