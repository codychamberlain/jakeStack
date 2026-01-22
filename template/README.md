# {{PROJECT_NAME}}

A modern full-stack application built with JakeStack.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Backend**: [Elysia](https://elysiajs.com)
- **Frontend**: [Vite](https://vitejs.dev) + [React](https://react.dev) + [Tailwind CSS](https://tailwindcss.com)
- **Database**: [PostgreSQL](https://www.postgresql.org) + [Drizzle ORM](https://orm.drizzle.team)
- **API Docs**: Swagger UI + Redoc

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- [Docker](https://docker.com) installed (for PostgreSQL)

### Setup

1. **Start the database**:
   ```bash
   docker compose up -d
   ```

2. **Copy environment variables**:
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies**:
   ```bash
   bun install
   ```

4. **Run database migrations**:
   ```bash
   bun run db:push
   ```

5. **Start development server**:
   ```bash
   bun run dev
   ```

The server will be running at `http://localhost:3000`.

### Development with Hot Reload

For full-stack development with hot reload on both frontend and backend:

```bash
bun run dev:all
```

This starts:
- Backend server at `http://localhost:3000`
- Vite dev server at `http://localhost:5173` (with API proxy)

## Available URLs

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Application (production build) |
| http://localhost:5173 | Vite dev server (during development) |
| http://localhost:3000/api | API root |
| http://localhost:3000/api/docs | Redoc API documentation |
| http://localhost:3000/api/swagger | Swagger UI |
| http://localhost:3000/api/health | Health check endpoint |

## Project Structure

```
{{PROJECT_NAME}}/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.tsx        # Root component
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Tailwind styles
│   ├── index.html
│   ├── vite.config.ts
│   └── tailwind.config.js
├── server/                 # Elysia backend
│   ├── index.ts           # Server entry point
│   ├── routes/
│   │   └── health.ts      # Health check endpoint
│   └── db/
│       ├── index.ts       # Drizzle ORM instance
│       ├── schema.ts      # Database schema
│       └── migrations/    # Generated migrations
├── docs/
│   └── index.html         # Redoc documentation page
├── docker-compose.yml      # PostgreSQL container
└── package.json
```

## Database (Drizzle ORM)

This project uses [Drizzle ORM](https://orm.drizzle.team) for type-safe database operations.

### Schema

Edit your database schema in `server/db/schema.ts`. Example tables (users, posts) are included to get you started.

### Commands

```bash
# Push schema changes directly to database (development)
bun run db:push

# Generate SQL migration files
bun run db:generate

# Run migrations
bun run db:migrate

# Open Drizzle Studio (database GUI)
bun run db:studio
```

### Usage

```typescript
import { db, users } from "./db";
import { eq } from "drizzle-orm";

// Insert
const newUser = await db.insert(users).values({
  email: "user@example.com",
  name: "John Doe",
}).returning();

// Select
const allUsers = await db.select().from(users);

// Select with condition
const user = await db.select().from(users).where(eq(users.email, "user@example.com"));

// Update
await db.update(users).set({ name: "Jane Doe" }).where(eq(users.id, 1));

// Delete
await db.delete(users).where(eq(users.id, 1));
```

## BetterStack Integration

To enable BetterStack uptime monitoring:

1. Create a heartbeat monitor in BetterStack
2. Copy the heartbeat URL
3. Add it to your `.env` file:
   ```
   BETTERSTACK_HEARTBEAT_URL=https://uptime.betterstack.com/api/v1/heartbeat/xxxxx
   ```

The health endpoint (`/api/health`) will automatically send heartbeats when the database is healthy.

## Building for Production

```bash
# Build the frontend
bun run build

# Start production server
bun run start
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start backend with hot reload |
| `bun run dev:client` | Start Vite dev server |
| `bun run dev:all` | Start both backend and frontend |
| `bun run build` | Build frontend for production |
| `bun run start` | Start production server |
| `bun run db:push` | Push schema changes to database |
| `bun run db:generate` | Generate SQL migration files |
| `bun run db:migrate` | Run migrations |
| `bun run db:studio` | Open Drizzle Studio GUI |
