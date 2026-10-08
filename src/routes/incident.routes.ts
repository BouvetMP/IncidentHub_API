import { Router } from "express";

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


import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validateIdMiddleware } from "../middlewares/validate-id.middleware";
import { validateIncidentMiddleware } from "../middlewares/validate-incident-middleware";
import { validatePriorityMiddleware } from "../middlewares/validate-priority.middleware";
import { validateTimeMiddleware } from "../middlewares/validate-time.middleware";

const router = Router();


router.get("/critical", getCriticalIncidents);

router.get("/pending", getPendingIncidents);

router.get("/stats", getIncidentStats);

router.get("/", getAllIncidents);

router.get("/:id", validateIdMiddleware, getIncidentById);

router.post(
  "/",
  authMiddleware,
  validateIncidentMiddleware,
  validatePriorityMiddleware,
  validateTimeMiddleware,
  createIncident
);

router.put(
  "/:id",
  authMiddleware,
  validateIdMiddleware,
  validateIncidentMiddleware,
  validatePriorityMiddleware,
  validateTimeMiddleware,
  updateIncident
);

router.patch(
  "/:id/status",
  authMiddleware,
  validateIdMiddleware,
  updateIncidentStatus
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateIdMiddleware,
  deleteIncident
);

export default router;