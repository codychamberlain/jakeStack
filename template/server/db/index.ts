import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/{{PROJECT_NAME}}";

// Connection for queries
const queryClient = postgres(DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Drizzle ORM instance
export const db = drizzle(queryClient, { schema });

// Export schema for convenience
export * from "./schema";

// Health check function
export async function healthCheck(): Promise<boolean> {
  try {
    await queryClient`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}

export default db;
