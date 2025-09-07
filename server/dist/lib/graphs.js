export function generateGraph({ numNodes, edgeProbability = 0.3, directed = false, weighted = false }) {
    const nodes = Array.from({ length: numNodes }, (_, i) => String(i + 1));
    const edges = [];
    for (let i = 0; i < numNodes; i += 1) {
        for (let j = i + 1; j < numNodes; j += 1) {
            if (Math.random() < edgeProbability) {
                const weight = weighted ? Math.floor(Math.random() * 9) + 1 : undefined;
                edges.push({ from: nodes[i], to: nodes[j], weight });
                if (directed) {
                    if (Math.random() < edgeProbability / 2) {
                        edges.push({ from: nodes[j], to: nodes[i], weight });
                    }
                }
                else {
                    edges.push({ from: nodes[j], to: nodes[i], weight });
                }
            }
        }
    }
    return { nodes, edges, directed };
}
export function buildAdjacency(graph) {
    const adj = {};
    for (const node of graph.nodes)
        adj[node] = [];
    for (const e of graph.edges) {
        adj[e.from].push({ to: e.to, weight: e.weight });
    }
    return adj;
}
