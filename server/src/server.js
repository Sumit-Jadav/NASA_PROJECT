import app from "./app.js";
import http from "http";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
console.log(PORT);
