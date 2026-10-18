import { describe, expect, test } from "bun:test"
import type { Graph } from "imp-core-types"
import {
  compileImpGraphToTomeCypher,
  TOME_NEO4J_NODE_LABEL,
} from "../src/index"

/** input → filter(status = "active") → limit(5) → output */
function pipelineGraph(): Graph {
  return {
    nodes: {
      in: { id: "in", type: "input", inputs: {} },
      col: { id: "col", type: "column", inputs: { name: "status" } },
      lit: { id: "lit", type: "literal", inputs: { value: "active" } },
      eq: { id: "eq", type: "equals", inputs: {} },
      filter: { id: "filter", type: "filter", inputs: {} },
      limit: { id: "limit", type: "limit", inputs: { count: 5 } },
      out: { id: "out", type: "output", inputs: {} },
    },
    edges: {
      e_col: { from: { node: "col", port: "value" }, to: { node: "eq", port: "left" } },
      e_lit: { from: { node: "lit", port: "value" }, to: { node: "eq", port: "right" } },
      e_pred: {
        from: { node: "eq", port: "value" },
        to: { node: "filter", port: "predicate" },
      },
      e_in: {
        from: { node: "in", port: "value" },
        to: { node: "filter", port: "collection" },
      },
      e_filter: {
        from: { node: "filter", port: "collection" },
        to: { node: "limit", port: "collection" },
      },
      e_out: {
        from: { node: "limit", port: "collection" },
        to: { node: "out", port: "value" },
      },
    },
  }
}

describe("tome-imp-cypher", () => {
  test("compiles against provisional TomeNode label", () => {
    const { cypher, parameters } = compileImpGraphToTomeCypher(pipelineGraph())
    expect(cypher).toContain(`MATCH (n0:${TOME_NEO4J_NODE_LABEL})`)
    expect(cypher).toContain("WHERE")
    expect(cypher).toContain("LIMIT $")
    expect(Object.values(parameters)).toContain("active")
    expect(Object.values(parameters)).toContain(5)
  })

  test("traverse uses relationship type ULID and direction", () => {
    const association = "01ARZ3NDEKTSV4RRFFQ69G5FAV"
    const graph: Graph = {
      nodes: {
        in: { id: "in", type: "input", inputs: {} },
        hop: {
          id: "hop",
          type: "traverse",
          inputs: { association, direction: 0 },
        },
        out: { id: "out", type: "output", inputs: {} },
      },
      edges: {
        e1: {
          from: { node: "in", port: "value" },
          to: { node: "hop", port: "collection" },
        },
        e2: {
          from: { node: "hop", port: "collection" },
          to: { node: "out", port: "value" },
        },
      },
    }

    const { cypher } = compileImpGraphToTomeCypher(graph)
    expect(cypher).toContain(`:\`${association}\``)
    expect(cypher).toMatch(/-\[r\d+:/)
  })
})
