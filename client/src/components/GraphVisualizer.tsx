import React, { useEffect, useMemo, useState } from 'react';
import { fetchGraph, runAlgo, Graph, Step } from '../api';
import { useAnimation } from '../hooks/useAnimation';

function layoutCircle(nodes: string[], radius: number, cx: number, cy: number) {
  const step = (Math.PI * 2) / Math.max(1, nodes.length);
  const pos: Record<string, { x: number; y: number }> = {};
  nodes.forEach((id, i) => {
    pos[id] = { x: cx + radius * Math.cos(i * step), y: cy + radius * Math.sin(i * step) };
  });
  return pos;
}

export const GraphVisualizer: React.FC = () => {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [algo, setAlgo] = useState<'bfs' | 'dfs' | 'dijkstra'>('bfs');
  const [start, setStart] = useState('1');
  const [speed, setSpeed] = useState(300);
  const [steps, setSteps] = useState<Step[]>([]);
  const { frame, index, total, play, stop, reset, isPlaying } = useAnimation(steps, speed);

  const positions = useMemo(() => graph ? layoutCircle(graph.nodes, 120, 160, 160) : {}, [graph]);

  useEffect(() => {
    (async () => setGraph(await fetchGraph({ nodes: 10, p: 0.35, weighted: true })))();
  }, []);

  const run = async () => {
    if (!graph) return;
    const s = await runAlgo(algo, graph, start);
    setSteps(s);
    reset();
    setTimeout(play, 0);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Graph Visualizer ({algo.toUpperCase()})</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={async () => setGraph(await fetchGraph({ nodes: 10, p: 0.35, weighted: true }))}>New Graph</button>
        <select value={algo} onChange={(e) => setAlgo(e.target.value as any)}>
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">Dijkstra</option>
        </select>
        <label>Start: <input value={start} onChange={(e) => setStart(e.target.value)} style={{ width: 48 }} /></label>
        <button onClick={run} disabled={!graph}>Run</button>
        <button onClick={play} disabled={isPlaying || steps.length === 0}>Play</button>
        <button onClick={stop} disabled={!isPlaying}>Pause</button>
        <button onClick={reset}>Reset</button>
        <label>Speed(ms): <input type="number" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} style={{ width: 80 }} /></label>
        <span>{index + 1}/{total}</span>
      </div>
      <svg width={320} height={320} style={{ background: '#f8fafc', marginTop: 16, border: '1px solid #e2e8f0' }}>
        {graph && graph.edges.map((e, i) => {
          const a = positions[e.from]; const b = positions[e.to];
          if (!a || !b) return null;
          return (
            <g key={i}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#94a3b8" strokeWidth={1} />
              {e.weight != null && (
                <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2} fill="#0f172a" fontSize={10}>{e.weight}</text>
              )}
            </g>
          );
        })}
        {graph && graph.nodes.map((id) => {
          const p = positions[id]; if (!p) return null;
          const isVisited = frame?.action && (frame.action === 'visit' || frame.action === 'settle') && frame.payload.node === id;
          return (
            <g key={id}>
              <circle cx={p.x} cy={p.y} r={14} fill={isVisited ? '#22c55e' : '#3b82f6'} />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={12} fill="#fff">{id}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
