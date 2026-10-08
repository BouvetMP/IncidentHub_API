declare namespace Express {
  interface Request {
    requestInfo?: {
      timestamp: string;
      method: string;
      path: string;
    };
    userRole?: "admin" | "technician";
  }
}