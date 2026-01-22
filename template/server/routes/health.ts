import { Elysia } from "elysia";
import { healthCheck } from "../db";

export const healthRoutes = new Elysia({ prefix: "/api" })
  .get("/health", async () => {
    const dbHealthy = await healthCheck();
    const status = dbHealthy ? "healthy" : "degraded";

    // Send heartbeat to BetterStack if configured
    const heartbeatUrl = process.env.BETTERSTACK_HEARTBEAT_URL;
    if (heartbeatUrl && dbHealthy) {
      try {
        await fetch(heartbeatUrl);
      } catch (error) {
        console.error("Failed to send heartbeat to BetterStack:", error);
      }
    }

    return {
      status,
      timestamp: new Date().toISOString(),
      checks: {
        database: dbHealthy ? "connected" : "disconnected",
      },
    };
  }, {
    detail: {
      tags: ["Health"],
      summary: "Health check",
      description: "Returns the health status of the application and its dependencies",
    },
  });
