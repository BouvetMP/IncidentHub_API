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
  
   { id: 2,
    title: "Impresora que no enciende",
    description: "La impresora a pesar de estar conectada a una fuente de energia como lo es el tomacorriente, no da señal de vida.",
    reporter: "Laura Puentes",
    location: "Oficina 404",
    priority: "MEDIUM",
    status: "OPEN",
    estimatedMinutes: 60,
    createdAt: "2026-09-18T08:00:00.000Z"},
    
  { id: 3,
    title: "Equipo bloqueado",
    description: "El equipo de la sala 301 está completamente bloqueado, al presionar las teclas o intentar manipular el mouse, no hay reacción evidente en la pantalla.",
    reporter: "Adán Guevara",
    location: "Sala 301",
    priority: "HIGH",
    status: "OPEN",
    estimatedMinutes: 20,
    createdAt: "2026-09-18T08:00:00.000Z"},

  { id: 4,
    title: "Error de pantalla azul",
    description: "Al trabajar apareció de repente un pantallazo azul con el siguiente mensaje: INACCESSIBLE_BOOT_DEVICE.",
    reporter: "Pablo Puertas",
    location: "Area contabilidad",
    priority: "HIGH",
    status: "OPEN",
    estimatedMinutes: 49,
    createdAt: "2026-09-18T08:00:00.000Z"},

  { id: 5,
    title: "Equipo sin Office",
    description: "El equipo en el que estoy trabajando no dispone de herramientas de office para desarrollar mis labores.",
    reporter: "Darién Romero",
    location: "Oficinas",
    priority: "LOW",
    status: "OPEN",
    estimatedMinutes: 60,
    createdAt: "2026-09-18T08:00:00.000Z"}

];