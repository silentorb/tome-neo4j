# AGENTS Guide — tome-neo4j

## Repository purpose

Neo4j adapters for Tome as **store modules** loaded via `dataStores` (same seam as `tome-sqlite`). This repo depends on Tome packages; Tome core must not take a hard dependency on Neo4j.

| Package | Role |
| --- | --- |
| `packages/tome-neo4j` | `createNeo4jModule()` stub; future Neo4j graph store / query path |

## Dependency direction

- **May** depend on `tome-graph-interfaces`, `tome-service-interfaces` (and later other Tome packages as needed)
- Root workspaces include sibling `../tome/packages/tome-graph-interfaces` and `../tome/packages/tome-service-interfaces`
- **Must not** require changes to tome’s `workspaces` to develop or test this repo
- Graph backends are **not** `extensions.json` kinds — use store/cache modules

## Project context

- Bun workspaces; `bun install` from repo root (sibling `../tome` required)
- Neo4j Community via `docker compose` (ports 7474 / 7687); CI uses the same image as a service container
- Keep Neo4j out of tome’s release image and default weighted suite

## Verify

```bash
bun run typecheck
bun test
```

Workbench (when mounted): `bash scripts/run-in-tome-neo4j.sh test`.

## Feature docs (in tome)

| Topic | Doc |
| --- | --- |
| Remote multi-user / phase 7 | `tome` → `docs/features/multi-user.md` |
| Graph store contracts | `tome` → `docs/features/graph-store.md` |
| Backlog | `tome` → `tasks/neo4j-support.md` |
