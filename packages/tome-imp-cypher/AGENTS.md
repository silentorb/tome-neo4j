# tome-imp-cypher — agent notes

## What it is

Thin Tome binder for Imp → Cypher against a **provisional** Neo4j property-graph schema (`:TomeNode`, relationship type = association ULID, direction = MATCH arrow). Compile-only — no Bolt driver or store module.

## Dependency rules

- Depends on `imp-cypher` and Imp packages (`imp-core-types`, `imp-registry`, `imp-collection-transforms`, `imp-pathing`)
- Must **not** import `tome-db`, `tome-editor`, or the `tome-neo4j` store package for compile
- Schema is provisional until Neo4j CRUD lands — revise deliberately

## Layout

| Path | Role |
| --- | --- |
| `src/schema.ts` | `createTomeNeo4jSchema`, `TOME_NEO4J_NODE_LABEL` |
| `src/registry.ts` | `createTomeNeo4jImpRegistry` (core + transforms + pathing) |
| `src/compile.ts` | `compileImpGraphToTomeCypher` |
| `tests/` | Compile string/param tests (no Neo4j) |

## Run

```bash
bun test   # from this package or repo root
```

## See also

- Repo [AGENTS.md](../../AGENTS.md)
- Imp Cypher: sibling `imp-cypher` → `docs/features/cypher.md`
- SQL binder analogue: `tome` → `packages/tome-imp-sql`
