export type Graph = {
  nodes: string[];
  edges: { from: string; to: string; weight?: number }[];
  directed: boolean;
};

const BASE = '/api';

export async function fetchArray(size = 30, min = 1, max = 100): Promise<number[]> {
  const res = await fetch(`${BASE}/array?size=${size}&min=${min}&max=${max}`);
  const json = await res.json();
  return json.data as number[];
}

export async function fetchGraph(params?: { nodes?: number; p?: number; directed?: boolean; weighted?: boolean }): Promise<Graph> {
  const url = new URL(`${BASE}/graph`, window.location.origin);
  if (params?.nodes) url.searchParams.set('nodes', String(params.nodes));
  if (params?.p) url.searchParams.set('p', String(params.p));
  if (params?.directed) url.searchParams.set('directed', 'true');
  if (params?.weighted) url.searchParams.set('weighted', 'true');
  const res = await fetch(url.toString());
  return res.json();
}

export type Step = { action: string; payload: any };

export async function runAlgo(path: 'bfs' | 'dfs' | 'dijkstra', graph: Graph, start: string): Promise<Step[]> {
  const res = await fetch(`${BASE}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ graph, start }),
  });
  const json = await res.json();
  return json.steps as Step[];
}
