# AlgoVision

Interactive Visual DSA Web App (MERN) to explore algorithm behavior with animated visuals.

## Features
- Graph algorithms: BFS, DFS, Dijkstra (server computes steps; client animates)
- Sorting demo: Bubble Sort frames (client-side) with adjustable speed
- Random array and random graph generators (server endpoints)
- Smooth animations via a reusable `useAnimation` hook
- React memoization to reduce re-renders and improve load speed

## Tech Stack
- Client: React + TypeScript (CRA), hooks, minimal CSS
- Server: Express + TypeScript, CORS, Morgan
- Monorepo: npm workspaces, concurrently for dev

## Getting Started
```bash
# from repo root
npm install
npm run dev
```
- Client: http://localhost:3000
- Server: http://localhost:4000

## API
- GET `/api/array?size=30&min=1&max=100` → `{ data: number[] }`
- GET `/api/graph?nodes=10&p=0.35&directed=false&weighted=true` → `{ nodes, edges, directed }`
- POST `/api/bfs|/api/dfs|/api/dijkstra` body: `{ graph, start }` → `{ steps }`

## UI Usage
- Sorting Visualizer: New Array → Play/Pause/Reset; tweak Speed (ms)
- Graph Visualizer: New Graph → choose BFS/DFS/Dijkstra; set Start node → Run

## Workshops & Demos
- Ask learners to predict next step before playing
- Compare BFS vs DFS visit order on the same graph
- Observe Dijkstra relax/settle steps and distances
- Change node count/edge probability to see topology effects

## Notes
- Minimal but extendable scaffold; add A*, TopSort, more sorts, better layouts/styling.
- CRA shows deprecation warnings; kept for simplicity. Consider Vite later.
