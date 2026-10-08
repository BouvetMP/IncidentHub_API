import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateTimeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { estimatedMinutes } = req.body;

  if (typeof estimatedMinutes !== "number" || isNaN(estimatedMinutes)) {
    throw new AppError(400, "El tiempo estimado debe ser un número válido");
  }

  if (!Number.isInteger(estimatedMinutes)) {
    throw new AppError(400, "El tiempo estimado debe ser un número entero");
  }

  if (estimatedMinutes <= 0) {
    throw new AppError(400, "El tiempo estimado debe ser mayor a 0");
  }

  if (estimatedMinutes > 480) {
    throw new AppError(400, "El tiempo estimado no puede superar los 480 minutos (8 horas)");
  }

  next();
};