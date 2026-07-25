import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const contentRouter = Router();

contentRouter.get("/services", async (_request, response) => {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  response.json({ services });
});

contentRouter.get("/services/:slug", async (request, response) => {
  const service = await prisma.service.findUnique({ where: { slug: request.params.slug } });

  if (!service) {
    response.status(404).json({ error: "Service not found" });
    return;
  }

  response.json({ service });
});

contentRouter.get("/case-studies", async (_request, response) => {
  const caseStudies = await prisma.caseStudy.findMany({ orderBy: { sortOrder: "asc" } });
  response.json({ caseStudies });
});

contentRouter.get("/case-studies/:slug", async (request, response) => {
  const caseStudy = await prisma.caseStudy.findUnique({ where: { slug: request.params.slug } });

  if (!caseStudy) {
    response.status(404).json({ error: "Case study not found" });
    return;
  }

  response.json({ caseStudy });
});

contentRouter.get("/testimonials", async (_request, response) => {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  response.json({ testimonials });
});
