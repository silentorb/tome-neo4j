# AGENTS Guide — tome-neo4j

## Repository purpose

Neo4j adapters for Tome as **store modules** loaded via `dataStores` (same seam as `tome-sqlite`), plus a thin Imp → Cypher binder. This repo depends on Tome packages and sibling `imp-cypher`; Tome core must not take a hard dependency on Neo4j.

| Package | Role |
| --- | --- |
| `packages/tome-neo4j` | `createNeo4jModule()` stub; future Neo4j graph store |
| `packages/tome-imp-cypher` | `compileImpGraphToTomeCypher` — provisional Neo4j schema binder |

## Dependency direction

- **May** depend on `tome-graph-interfaces`, `tome-service-interfaces`, `imp-cypher`, and Imp packages as needed
- Root workspaces include sibling `../tome/packages/…`, `../imp-cypher/packages/imp-cypher`, and `../imp-ts/packages/*`
- **Must not** require changes to tome’s `workspaces` to develop or test this repo
- Graph backends are **not** `extensions.json` kinds — use store/cache modules

## Project context

- Bun workspaces; `bun install` from repo root (siblings `../tome`, `../imp-ts`, `../imp-cypher` required)
- Neo4j Community via `docker compose` (ports 7474 / 7687); CI uses the same image as a service container
- Keep Neo4j out of tome’s release image and default weighted suite
- Imp → Cypher compile tests do not need a live database

## Verify

```bash
bun run typecheck
bun test
```

Workbench (when mounted): `bash scripts/run-in-tome-neo4j.sh run test`.

## Feature docs (in tome / imp-cypher)

| Topic | Doc |
| --- | --- |
| Remote multi-user / phase 7 | `tome` → `docs/features/multi-user.md` |
| Graph store contracts | `tome` → `docs/features/graph-store.md` |
| Imp → Cypher translator | `imp-cypher` → `docs/features/cypher.md` |
| Backlog | `tome` → `tasks/neo4j-support.md` |
