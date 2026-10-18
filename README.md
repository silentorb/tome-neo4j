# tome-neo4j

Neo4j graph backend packages for [Tome](https://github.com/silentorb/tome). This repo **depends on Tome** (interfaces / store module contracts) — Tome does **not** depend on this repo. Hosts load adapters via `tome-server` `dataStores` when configured.

Heavy Neo4j Community runtime and CI live here so tome’s light weighted test suite stays lean.

## Packages

| Package | Role |
| --- | --- |
| `packages/tome-neo4j` | Store-module stub (`createNeo4jModule`) — graph CRUD / Cypher Imp TBD |

## Layout (workbench)

Clone as a sibling of `tome` and open [silentorb-workbench](https://github.com/silentorb/silentorb-workbench). Mount path: `.mnt/tome-neo4j` (`TOME_NEO4J_REPO` override).

```
../tome/
../tome-neo4j/   ← this repo
```

## Local Neo4j

Official Community image (modest heap):

```bash
docker compose up -d
```

| Port | Use |
| --- | --- |
| `7474` | HTTP / Browser |
| `7687` | Bolt |

Default auth (dev only): `neo4j` / `tome-neo4j-dev`. Override with `NEO4J_AUTH` / compose env. Bolt URI: `bolt://localhost:7687`.

Stop: `docker compose down`.

## Develop / verify

Requires sibling `../tome` (workspaces pull `tome-graph-interfaces` and `tome-service-interfaces`).

```bash
bun install
bun run typecheck
bun test
```

From silentorb-workbench: `bash scripts/run-in-tome-neo4j.sh test` (when mounted).

## CI

GitHub Actions checks out this repo and `silentorb/tome` as siblings, starts Neo4j Community as a service container, then runs typecheck + tests.

## See also

- Tome charter: [multi-user.md](https://github.com/silentorb/tome/blob/main/docs/features/multi-user.md) phase 7
- Task: [neo4j-support.md](https://github.com/silentorb/tome/blob/main/tasks/neo4j-support.md)
- [graph-store.md](https://github.com/silentorb/tome/blob/main/docs/features/graph-store.md)
