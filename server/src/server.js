import app from "./app.js";
import http from "http";
import { loadPlanets } from "./models/planets.model.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

await loadPlanets();

server.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
console.log(PORT);
