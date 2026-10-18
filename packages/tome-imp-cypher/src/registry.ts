import { collectionTransformsLibrary } from "imp-collection-transforms"
import { pathingLibrary } from "imp-pathing"
import { createRegistry, loadLibrary } from "imp-registry"
import { coreNodeLibrary } from "imp-core-types"

/**
 * Registry with core + collection transforms + pathing for Tome Neo4j Imp hosts.
 * v1 omits corpus / hosts_projection (SQL-only Tome operators).
 */
export function createTomeNeo4jImpRegistry() {
  return loadLibrary(
    loadLibrary(
      loadLibrary(createRegistry(), coreNodeLibrary),
      collectionTransformsLibrary,
    ),
    pathingLibrary,
  )
}
