import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";
import { AppError } from "../util/app-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  _: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: "validation error", issues: z.treeifyError(error) });
  }

  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return response.status(409).json({ message: "Email já está em uso" });
  }

  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return response.status(404).json({ message: "Recurso não encontrado" });
  }
  return response.status(500).json({ message: error.message });
}
