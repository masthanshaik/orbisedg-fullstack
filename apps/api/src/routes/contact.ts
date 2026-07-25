import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import { env } from "../lib/env.js";
import { prisma } from "../lib/prisma.js";

export const contactRouter = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many enquiries. Please wait a few minutes and try again." },
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  website: z.string().trim().url().max(300).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(5000),
  consent: z.literal(true),
  websiteField: z.string().max(200).optional().or(z.literal("")),
});

contactRouter.post("/contact", contactLimiter, async (request, response) => {
  const payload = contactSchema.parse(request.body);

  // Honeypot field: real visitors never fill this.
  if (payload.websiteField) {
    response.status(202).json({ ok: true });
    return;
  }

  const submission = await prisma.contactSubmission.create({
    data: {
      name: payload.name,
      email: payload.email.toLowerCase(),
      company: payload.company || null,
      website: payload.website || null,
      service: payload.service || null,
      budget: payload.budget || null,
      message: payload.message,
      consent: payload.consent,
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? null,
    },
  });

  if (env.CONTACT_WEBHOOK_URL) {
    void fetch(env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event: "contact.created",
        submission: {
          id: submission.id,
          name: submission.name,
          email: submission.email,
          company: submission.company,
          service: submission.service,
          budget: submission.budget,
          message: submission.message,
          createdAt: submission.createdAt,
        },
      }),
    }).catch((error) => console.error("Contact webhook failed", error));
  }

  response.status(201).json({
    ok: true,
    message: "Thanks — your enquiry has been received. Orbisedg will get back to you shortly.",
  });
});
