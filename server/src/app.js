import express from "express";
import planetRouter from "./routes/planets/planets.router.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(planetRouter);

export default app;
