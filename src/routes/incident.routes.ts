import { Router } from "express";

// Importamos todas las funciones del controller
import {
  getAllIncidents,
  getIncidentById,
  getCriticalIncidents,
  getPendingIncidents,
  getIncidentStats,
  createIncident,
  updateIncident,
  updateIncidentStatus,
  deleteIncident
} from "../controllers/incident.controller";

// Importamos los middlewares necesarios
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validateIdMiddleware } from "../middlewares/validate-id.middleware";
import { validateIncidentMiddleware } from "../middlewares/validate-incident-middleware";
import { validatePriorityMiddleware } from "../middlewares/validate-priority.middleware";
import { validateTimeMiddleware } from "../middlewares/validate-time.middleware";

const router = Router();

// =========================================================================
// 1. RUTAS ESPECÍFICAS (RETOS 1, 2 y 3)
// ⚠️ Deben ir ANTES de /:id para no ser confundidas con un ID
// =========================================================================

// GET /api/incidents/critical
router.get("/critical", getCriticalIncidents);

// GET /api/incidents/pending
router.get("/pending", getPendingIncidents);

// GET /api/incidents/stats
router.get("/stats", getIncidentStats);

// =========================================================================
// 2. RUTAS CRUD PRINCIPALES
// =========================================================================

// GET /api/incidents (Público: no requiere token)
router.get("/", getAllIncidents);

// GET /api/incidents/:id (Público, pero valida que el ID sea numérico)
router.get("/:id", validateIdMiddleware, getIncidentById);

// POST /api/incidents (Requiere token + validaciones del body)
router.post(
  "/",
  authMiddleware,
  validateIncidentMiddleware,
  validatePriorityMiddleware,
  validateTimeMiddleware,
  createIncident
);

// PUT /api/incidents/:id (Requiere token + validación de ID + validaciones del body)
router.put(
  "/:id",
  authMiddleware,
  validateIdMiddleware,
  validateIncidentMiddleware,
  validatePriorityMiddleware,
  validateTimeMiddleware,
  updateIncident
);

// PATCH /api/incidents/:id/status (Requiere token + validación de ID)
router.patch(
  "/:id/status",
  authMiddleware,
  validateIdMiddleware,
  updateIncidentStatus
);

// DELETE /api/incidents/:id (Protegido: Token + Rol Admin + validación de ID)
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateIdMiddleware,
  deleteIncident
);

export default router;