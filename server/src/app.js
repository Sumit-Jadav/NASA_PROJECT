import express from "express";
import planetRouter from "./routes/planets/planets.router.js";
import cors from "cors";
import path from "path";

const app = express();

//! middleeware to allow cors from rect framework.
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "..", "public")));

app.use(planetRouter);

export default app;
