# create-jakestack

A CLI tool to scaffold modern full-stack applications with Bun, Elysia, React, and PostgreSQL.

## Quick Start

```bash
npx create-jakestack my-app
cd my-app
docker compose up -d
bun install
bun run dev
```

## Tech Stack

Generated projects include:

| Layer | Technology |
|-------|------------|
| Runtime | [Bun](https://bun.sh) |
| Backend | [Elysia](https://elysiajs.com) |
| Frontend | [Vite](https://vitejs.dev) + [React](https://react.dev) + [Tailwind CSS](https://tailwindcss.com) |
| Database | [PostgreSQL](https://postgresql.org) + [Drizzle ORM](https://orm.drizzle.team) |
| API Docs | Swagger UI + [Redoc](https://redocly.com/redoc) |
| Monitoring | [BetterStack](https://betterstack.com) heartbeat integration |

## Generated Project Structure

```
my-app/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx      # Main layout with sidebar
│   │   │   └── Sidebar.tsx     # Navigation sidebar
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx   # Home dashboard
│   │   │   ├── Users.tsx       # Users management
│   │   │   ├── Posts.tsx       # Posts/content
│   │   │   └── Settings.tsx    # App settings
│   │   ├── App.tsx             # Router setup
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Tailwind styles
│   ├── index.html
│   ├── vite.config.ts
│   └── tailwind.config.js
├── server/                     # Elysia backend
│   ├── index.ts                # Server entry point
│   ├── routes/
│   │   └── health.ts           # Health check endpoint
│   └── db/
│       ├── index.ts            # Drizzle ORM instance
│       └── schema.ts           # Database schema
├── docs/
│   └── index.html              # Redoc API documentation
├── docker-compose.yml          # PostgreSQL container
├── drizzle.config.ts           # Drizzle configuration
├── .env.example                # Environment template
├── package.json
└── README.md
```

## Features

### Backend
- Elysia server with CORS and request logging
- Auto-generated OpenAPI/Swagger documentation
- PostgreSQL with Drizzle ORM (type-safe queries)
- Health check endpoint for uptime monitoring
- BetterStack heartbeat integration

### Frontend
- Vite for fast development and optimized builds
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for client-side navigation
- Pre-built dashboard layout with sidebar
- Dark theme UI components

### Developer Experience
- Hot reload for both frontend and backend
- Drizzle Studio for database GUI
- Type-safe database schema
- API documentation at `/api/docs` and `/api/swagger`

## Available Scripts

After creating a project:

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

## URLs

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Application |
| http://localhost:5173 | Vite dev server (development) |
| http://localhost:3000/api | API root |
| http://localhost:3000/api/docs | Redoc documentation |
| http://localhost:3000/api/swagger | Swagger UI |
| http://localhost:3000/api/health | Health check endpoint |

## Development

### Prerequisites

- [Bun](https://bun.sh) v1.0+
- [Docker](https://docker.com) (for PostgreSQL)

### Building the CLI

```bash
# Install dependencies
bun install

# Build
bun run build

# Test locally
bun src/index.ts my-test-app
```

### Publishing

```bash
npm publish
```

## License

MIT
