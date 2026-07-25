import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

export const notFoundHandler: RequestHandler = (request, response) => {
  response.status(404).json({
    error: "Not found",
    path: request.originalUrl,
  });
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      error: "Validation failed",
      details: error.flatten().fieldErrors,
    });
    return;
  }

  console.error(error);
  response.status(500).json({
    error: "An unexpected server error occurred.",
  });
};
