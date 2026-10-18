import type { Graph } from "imp-core-types"
import { compileCypher, graphToCypher } from "imp-cypher"
import { createTomeNeo4jImpRegistry } from "./registry"
import { createTomeNeo4jSchema } from "./schema"

export interface CompiledTomeImpCypher {
  cypher: string
  parameters: Readonly<Record<string, unknown>>
}

/** Lower an Imp graph against the provisional Tome Neo4j property-graph schema. */
export function compileImpGraphToTomeCypher(
  graph: Graph,
): CompiledTomeImpCypher {
  const compiled = graphToCypher(graph, {
    registry: createTomeNeo4jImpRegistry(),
    schema: createTomeNeo4jSchema(),
  })
  return compileCypher(compiled)
}
