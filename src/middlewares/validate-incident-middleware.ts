import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateIncidentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, description, reporter, location, priority, estimatedMinutes } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    throw new AppError(400, "El título es obligatorio y debe ser un texto no vacío");
  }


  if (!description || typeof description !== "string" || description.trim().length === 0) {
    throw new AppError(400, "La descripción es obligatoria y debe ser un texto no vacío");
  }

  if (!reporter || typeof reporter !== "string" || reporter.trim().length === 0) {
    throw new AppError(400, "El reportante es obligatorio y debe ser un texto no vacío");
  }


  if (!location || typeof location !== "string" || location.trim().length === 0) {
    throw new AppError(400, "La ubicación es obligatoria y debe ser un texto no vacío");
  }


  if (priority === undefined || priority === null) {
    throw new AppError(400, "La prioridad es obligatoria");
  }


  if (estimatedMinutes === undefined || estimatedMinutes === null) {
    throw new AppError(400, "El tiempo estimado en minutos es obligatorio");
  }

  next();
};