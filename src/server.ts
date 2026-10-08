import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("═══════════════════════════════════════════════════");
  console.log("  🚀 IncidentHub API v1 iniciada con éxito");
  console.log(`  📡 Servidor escuchando en: http://localhost:${PORT}`);
  console.log(`  📋 Endpoint base: http://localhost:${PORT}/api/incidents`);
  console.log("═══════════════════════════════════════════════════");
});