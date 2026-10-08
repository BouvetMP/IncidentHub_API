import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const { id } = req.params;

  const parsedId = Number(id);

  if (isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
  
    throw new AppError(400, "Invalid incident id");
  }

  next();
};