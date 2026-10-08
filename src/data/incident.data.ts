import { Incident } from "../models/incident.model";


let currentId: number = 6;
export const getNextId = (): number => currentId++;

export const incidents: Incident[] = [
  { id: 1,
    title: "Proyector sin señal",
    description: "El proyector no reconoce ningún computador conectado.",
    reporter: "Carlos Díaz",
    location: "Aula 201",
    priority: "MEDIUM",
    status: "OPEN",
    estimatedMinutes: 30,
    createdAt: "2026-09-18T08:00:00.000Z"},
];