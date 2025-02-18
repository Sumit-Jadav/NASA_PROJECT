import app from "./app.js";
import http from "http";
import { loadPlanets } from "./models/planets.model.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@nasa-cluster.oox08.mongodb.net/?retryWrites=true&w=majority&appName=NASA-Cluster`;

const server = http.createServer(app);

mongoose.connection.once("open", () =>
  console.log(`MongoDB connection is ready!!`)
);

mongoose.connection.on("error", (err) => console.error(err));
await mongoose.connect(MONGO_URI);

await loadPlanets();

server.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
