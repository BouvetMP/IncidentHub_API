import { Request, Response, NextFunction } from "express";
import { incidents, getNextId } from "../data/incident.data";
import { CreateIncidentDto, UpdateIncidentDto, UpdateStatusDto } from "../dtos/incident.dto";
import { Incident, VALID_STATUSES, ALLOWED_TRANSITIONS } from "../models/incident.model";
import { AppError } from "../errors/app-error";

export const getAllIncidents = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).json({
      ok: true,
      total: incidents.length,
      data: incidents
    });
  } catch (error) {
    next(error);
  }
};


export const getCriticalIncidents = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const criticalIncidents = incidents.filter(
      (incident) => incident.priority === "CRITICAL"
    );

    res.status(200).json({
      ok: true,
      total: criticalIncidents.length,
      data: criticalIncidents
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingIncidents = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const pendingIncidents = incidents.filter(
      (incident) => incident.status === "OPEN" || incident.status === "IN_PROGRESS"
    );

    res.status(200).json({
      ok: true,
      total: pendingIncidents.length,
      data: pendingIncidents
    });
  } catch (error) {
    next(error);
  }
};


export const getIncidentStats = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const total = incidents.length;
    const open = incidents.filter((i) => i.status === "OPEN").length;
    const inProgress = incidents.filter((i) => i.status === "IN_PROGRESS").length;
    const resolved = incidents.filter((i) => i.status === "RESOLVED").length;
    const critical = incidents.filter((i) => i.priority === "CRITICAL").length;

    const averageEstimatedMinutes =
      total > 0
        ? Math.round(
            incidents.reduce((sum, i) => sum + i.estimatedMinutes, 0) / total
          )
        : 0;

    res.status(200).json({
      ok: true,
      data: {
        total,
        open,
        inProgress,
        resolved,
        critical,
        averageEstimatedMinutes
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getIncidentById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    
    const id = Number(req.params.id);
    const incident = incidents.find((i) => i.id === id);

    if (!incident) {
      throw new AppError(404, "Incident not found");
    }

    res.status(200).json({
      ok: true,
      data: incident
    });
  } catch (error) {
    next(error);
  }
};


export const createIncident = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const dto: CreateIncidentDto = req.body;

    const newIncident: Incident = {
      id: getNextId(),
      title: dto.title.trim(),
      description: dto.description.trim(),
      reporter: dto.reporter.trim(),
      location: dto.location.trim(),
      priority: dto.priority,
      status: "OPEN",
      estimatedMinutes: dto.estimatedMinutes,
      createdAt: new Date().toISOString()
    };

    incidents.push(newIncident);

    res.status(201).json({
      ok: true,
      message: "Incident created successfully",
      data: newIncident
    });
  } catch (error) {
    next(error);
  }
};


export const updateIncident = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = Number(req.params.id);
    const index = incidents.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new AppError(404, "Incident not found");
    }

    const dto: UpdateIncidentDto = req.body;

    const updatedIncident: Incident = {
      ...incidents[index],
      title: dto.title.trim(),
      description: dto.description.trim(),
      reporter: dto.reporter.trim(),
      location: dto.location.trim(),
      priority: dto.priority,
      estimatedMinutes: dto.estimatedMinutes
    };

    incidents[index] = updatedIncident;

    res.status(200).json({
      ok: true,
      message: "Incident updated successfully",
      data: updatedIncident
    });
  } catch (error) {
    next(error);
  }
};


export const updateIncidentStatus = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = Number(req.params.id);
    const index = incidents.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new AppError(404, "Incident not found");
    }

    const { status }: UpdateStatusDto = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      throw new AppError(
        400,
        `Invalid status '${status}'. Allowed values: ${VALID_STATUSES.join(", ")}`
      );
    }

    const currentStatus = incidents[index].status;
    const allowedNextStatuses = ALLOWED_TRANSITIONS[currentStatus];

    if (!allowedNextStatuses.includes(status)) {
      throw new AppError(
        400,
        `Transition from '${currentStatus}' to '${status}' is not allowed`
      );
    }

    incidents[index].status = status;

    res.status(200).json({
      ok: true,
      message: `Incident status updated to '${status}'`,
      data: incidents[index]
    });
  } catch (error) {
    next(error);
  }
};

export const deleteIncident = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = Number(req.params.id);
    const index = incidents.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new AppError(404, "Incident not found");
    }

    incidents.splice(index, 1);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};