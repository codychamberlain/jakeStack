import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { staticPlugin } from "@elysiajs/static";
import { healthRoutes } from "./routes/health";

const PORT = process.env.PORT || 3000;

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/api/swagger",
      documentation: {
        info: {
          title: "{{PROJECT_NAME}} API",
          version: "1.0.0",
          description: "API documentation for {{PROJECT_NAME}}",
        },
        tags: [
          { name: "Health", description: "Health check endpoints" },
          { name: "API", description: "API endpoints" },
        ],
      },
    })
  )
  .use(healthRoutes)
  .get("/api/docs", () => Bun.file("docs/index.html"), {
    detail: {
      tags: ["API"],
      summary: "Redoc documentation",
      description: "Serves the Redoc API documentation page",
    },
  })
  .get("/api", () => ({
    message: "Welcome to {{PROJECT_NAME}} API",
    version: "1.0.0",
  }), {
    detail: {
      tags: ["API"],
      summary: "API root",
      description: "Returns API information",
    },
  })
  .use(
    staticPlugin({
      assets: "client/dist",
      prefix: "/",
    })
  )
  .get("*", () => Bun.file("client/dist/index.html"))
  .listen(PORT);

console.log(`🚀 Server running at http://localhost:${PORT}`);
console.log(`📚 API Docs at http://localhost:${PORT}/api/docs`);
console.log(`❤️  Health check at http://localhost:${PORT}/api/health`);

export type App = typeof app;
