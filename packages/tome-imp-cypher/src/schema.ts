/**
 * Provisional Tome Neo4j property-graph schema for Imp → Cypher.
 * Not a committed store contract — revise when Neo4j CRUD lands.
 */

import type { PropertyGraphSchema } from "imp-cypher"

const ASSOCIATION_ID_RE = /^[0-9A-HJKMNP-TV-Z]{26}$/

/** Provisional node label for Tome design/identity nodes in Neo4j. */
export const TOME_NEO4J_NODE_LABEL = "TomeNode"

/**
 * Imp PropertyGraphSchema for provisional Tome Neo4j storage:
 * - Nodes: `:TomeNode` with properties on the node
 * - Relationships: type = bare relationship-type ULID; direction selects MATCH arrow
 */
export function createTomeNeo4jSchema(): PropertyGraphSchema {
  return {
    nodeLabel: TOME_NEO4J_NODE_LABEL,
    idProperty: "id",
    relationship(association, direction) {
      const id = association.trim()
      if (!ASSOCIATION_ID_RE.test(id) && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(id)) {
        // Allow ULID relationship types and simple test names (e.g. "knows").
        throw new Error(`Invalid relationship type / association "${association}"`)
      }
      if (direction !== 0 && direction !== 1) {
        throw new Error(`direction must be 0 or 1, got ${String(direction)}`)
      }
      return { type: id, outbound: direction === 0 }
    },
  }
}

/** Default provisional schema instance. */
export const tomeNeo4jSchema = createTomeNeo4jSchema()
