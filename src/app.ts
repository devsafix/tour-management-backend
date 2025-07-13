import express, { Application, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/golbalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser"

const app: Application = express();

app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// all routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Tour Management API is running");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
