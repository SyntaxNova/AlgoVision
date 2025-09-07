import { Graph, GraphNodeId, Step } from '../types/index.js';
import { buildAdjacency } from './graphs.js';

export function bfs(graph: Graph, start: GraphNodeId): Step<any>[] {
  const adj = buildAdjacency(graph);
  const visited = new Set<GraphNodeId>();
  const queue: GraphNodeId[] = [];
  const steps: Step<any>[] = [];
  queue.push(start);
  visited.add(start);
  steps.push({ action: 'enqueue', payload: { node: start } });
  while (queue.length) {
    const node = queue.shift()!;
    steps.push({ action: 'visit', payload: { node } });
    for (const nbr of adj[node]) {
      if (!visited.has(nbr.to)) {
        visited.add(nbr.to);
        queue.push(nbr.to);
        steps.push({ action: 'enqueue', payload: { node: nbr.to, parent: node } });
      }
    }
  }
  return steps;
}

export function dfs(graph: Graph, start: GraphNodeId): Step<any>[] {
  const adj = buildAdjacency(graph);
  const visited = new Set<GraphNodeId>();
  const steps: Step<any>[] = [];
  function explore(node: GraphNodeId) {
    visited.add(node);
    steps.push({ action: 'visit', payload: { node } });
    for (const nbr of adj[node]) {
      if (!visited.has(nbr.to)) {
        steps.push({ action: 'traverse', payload: { from: node, to: nbr.to } });
        explore(nbr.to);
      }
    }
  }
  explore(start);
  return steps;
}

export function dijkstra(graph: Graph, start: GraphNodeId): Step<any>[] {
  const adj = buildAdjacency(graph);
  const dist: Record<GraphNodeId, number> = {};
  const visited = new Set<GraphNodeId>();
  const steps: Step<any>[] = [];
  for (const n of graph.nodes) dist[n] = Number.POSITIVE_INFINITY;
  dist[start] = 0;
  steps.push({ action: 'init', payload: { start } });
  while (visited.size < graph.nodes.length) {
    let u: GraphNodeId | null = null;
    let best = Number.POSITIVE_INFINITY;
    for (const n of graph.nodes) {
      if (!visited.has(n) && dist[n] < best) {
        best = dist[n]; u = n;
      }
    }
    if (u === null) break;
    visited.add(u);
    steps.push({ action: 'settle', payload: { node: u, dist: dist[u] } });
    for (const { to, weight = 1 } of adj[u]) {
      if (visited.has(to)) continue;
      const alt = dist[u] + weight;
      if (alt < dist[to]) {
        dist[to] = alt;
        steps.push({ action: 'relax', payload: { from: u, to, weight, dist: alt } });
      }
    }
  }
  return steps;
}
