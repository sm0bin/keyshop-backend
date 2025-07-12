import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from "./app/config";

let server: Server;

if (!config.databaseURL || !config.port) {
  throw new Error(
    "Missing essential configuration. Check your environment variables."
  );
}

async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.databaseURL as string);
    console.log("Database connection established.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

async function startServer(): Promise<void> {
  try {
    server = app.listen(config.port, () => {
      console.log(`Server is listening on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    throw error;
  }
}

async function main(): Promise<void> {
  try {
    await connectDatabase();
    await startServer();
  } catch (error) {
    console.error("Application startup failed:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("\nGracefully shutting down...");
  if (server) {
    server.close(() => console.log("Server closed."));
  }
  await mongoose.connection.close();
  console.log("Database connection closed.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nGracefully shutting down...");
  if (server) {
    server.close(() => console.log("Server closed."));
  }
  await mongoose.connection.close();
  console.log("Database connection closed.");
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

main();
