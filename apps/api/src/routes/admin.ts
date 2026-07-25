import { Router } from "express";
import { z } from "zod";
import { requireAdminKey } from "../middleware/admin-auth.js";
import { prisma } from "../lib/prisma.js";

export const adminRouter = Router();
adminRouter.use(requireAdminKey);

adminRouter.get("/leads", async (request, response) => {
  const query = z
    .object({
      page: z.coerce.number().int().positive().default(1),
      pageSize: z.coerce.number().int().min(1).max(100).default(25),
      status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "SPAM"]).optional(),
    })
    .parse(request.query);

  const where = query.status ? { status: query.status } : undefined;
  const [leads, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
    prisma.contactSubmission.count({ where }),
  ]);

  response.json({
    leads,
    pagination: {
      page: query.page,
      pageSize: query.pageSize,
      total,
      pages: Math.ceil(total / query.pageSize),
    },
  });
});

adminRouter.patch("/leads/:id/status", async (request, response) => {
  const { status } = z
    .object({ status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "SPAM"]) })
    .parse(request.body);

  const lead = await prisma.contactSubmission.update({
    where: { id: request.params.id },
    data: { status },
  });

  response.json({ lead });
});
