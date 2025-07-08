/* eslint-disable no-console */

import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { Server } from "http";
import { envVariables } from "./app/config/env";

dotenv.config();
const port = envVariables.PORT || 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(envVariables.DATABASE_URL);
    console.log("✅ Database connected");
    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect database", err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection Detected. Server Shutting Down ...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception Detected. Server Shutting Down ...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
