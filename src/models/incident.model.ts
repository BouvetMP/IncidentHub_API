export type IncidentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type IncidentStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export const VALID_PRIORITIES: IncidentPriority[] = [
  "LOW", "MEDIUM", "HIGH", "CRITICAL"
];

export const VALID_STATUSES: IncidentStatus[] = [
  "OPEN", "IN_PROGRESS", "RESOLVED"
];

export const ALLOWED_TRANSITIONS: Record<IncidentStatus, IncidentStatus[]> = {
  OPEN: ["IN_PROGRESS", "RESOLVED"],
  IN_PROGRESS: ["RESOLVED"],
  RESOLVED: []
};

export interface Incident {
  id: number;
  title: string;
  description: string;
  reporter: string;
  location: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  estimatedMinutes: number;
  createdAt: string;
}