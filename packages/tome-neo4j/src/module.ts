import type { TomeCacheModule } from "tome-service-interfaces";

/**
 * Neo4j store module for Tome `dataStores` wiring.
 * Stub: `open()` rejects until graph store / Cypher Imp are implemented.
 */
export function createNeo4jModule(): TomeCacheModule {
  return {
    id: "tome-neo4j",
    async open(_options) {
      throw new Error(
        "tome-neo4j is a scaffold stub; Neo4j graph store is not implemented yet",
      );
    },
  };
}
