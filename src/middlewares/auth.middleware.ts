import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";


const VALID_TOKENS: Record<string, "admin" | "technician"> = {
  "instructor-token": "admin",
  "technician-token": "technician"
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, "El encabezado de autorización es obligatorio");
  }

  const parts = authHeader.split(" ");

  
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new AppError(401, "Formato de autorización inválido. Use: Bearer <token>");
  }

  const token = parts[1];

  if (!VALID_TOKENS[token]) {
    throw new AppError(401, "Token Expirado o Invalido");
  }

  req.userRole = VALID_TOKENS[token];

  next();
};