import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import content from "../src/data/content.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  const services = Object.entries(content.services);
  const caseStudies = Object.entries(content.case_studies);

  for (const [index, [slug, service]] of services.entries()) {
    await prisma.service.upsert({
      where: { slug },
      update: {
        ...service,
        sortOrder: index,
      },
      create: {
        slug,
        ...service,
        sortOrder: index,
      },
    });
  }

  for (const [index, [slug, study]] of caseStudies.entries()) {
    await prisma.caseStudy.upsert({
      where: { slug },
      update: {
        ...study,
        sortOrder: index,
      },
      create: {
        slug,
        ...study,
        sortOrder: index,
      },
    });
  }

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: content.testimonials.map((testimonial, index) => ({
      ...testimonial,
      sortOrder: index,
    })),
  });

  console.log(
    `Seeded ${services.length} services, ${caseStudies.length} case studies, and ${content.testimonials.length} testimonials.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
