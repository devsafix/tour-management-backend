import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Tour Management API is running");
});

export default app;
