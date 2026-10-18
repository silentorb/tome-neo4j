# tome-imp-cypher

Tome binder for Imp → Cypher (provisional Neo4j schema). Compile-only — no mutations or Bolt execution.

```ts
import { compileImpGraphToTomeCypher } from "tome-imp-cypher"

const { cypher, parameters } = compileImpGraphToTomeCypher(graph)
```

See package [AGENTS.md](./AGENTS.md).
