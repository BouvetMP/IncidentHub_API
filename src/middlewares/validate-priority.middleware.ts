import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";
import { VALID_PRIORITIES } from "../models/incident.model";

export const validatePriorityMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { priority } = req.body;

  if (!VALID_PRIORITIES.includes(priority)) {
    throw new AppError(
      400,
      `Prioridad inválida '${priority}'. Valores permitidos: ${VALID_PRIORITIES.join(", ")}`
    );

  }

  if (priority === "CRITICAL" && req.body.estimatedMinutes > 60) {
    throw new AppError(
      400,
      "Los incidentes críticos no pueden superar los 60 minutos estimados"
    );
  }

  next();
};