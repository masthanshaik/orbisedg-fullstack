import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./lib/env.js";
import { adminRouter } from "./routes/admin.js";
import { contactRouter } from "./routes/contact.js";
import { contentRouter } from "./routes/content.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";

export const app = express();

if (env.TRUST_PROXY) {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["content-type", "x-admin-key"],
  }),
);
app.use(express.json({ limit: "50kb" }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    service: "orbisedg-api",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", contentRouter);
app.use("/api", contactRouter);
app.use("/api/admin", adminRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
