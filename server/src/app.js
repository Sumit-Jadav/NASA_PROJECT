import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import planetRouter from "./routes/planets/planets.router.js";
import launchesRouter from "./routes/launches/launches.router.js";

const app = express();

//! middleeware to allow cors from rect framework.
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "..", "public")));

app.use("/planets", planetRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) =>
  res.sendFile(path.join(import.meta.dirname, "..", "public", "index.html"))
);
export default app;
