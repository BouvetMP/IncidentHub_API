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
      `Invalid priority '${priority}'. Allowed values: ${VALID_PRIORITIES.join(", ")}`
    );

  }

  if (priority === "CRITICAL" && req.body.estimatedMinutes > 60) {
    throw new AppError(
      400,
      "Critical incidents cannot exceed 60 estimated minutes"
    );
  }

  next();
};