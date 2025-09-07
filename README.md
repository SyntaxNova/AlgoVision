# AlgoVision

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Tech](https://img.shields.io/badge/Tech-MERN-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blueviolet)
![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20TypeScript-orange)
![Status](https://img.shields.io/badge/Status-Active-success)
[![GitHub stars](https://img.shields.io/github/stars/SyntaxNova/AlgoVision?style=social)](https://github.com/SyntaxNova/AlgoVision/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/SyntaxNova/AlgoVision)](https://github.com/SyntaxNova/AlgoVision/issues)
[![GitHub forks](https://img.shields.io/github/forks/SyntaxNova/AlgoVision?style=social)](https://github.com/SyntaxNova/AlgoVision/network/members)

---

Interactive visual platform to learn and explore Data Structures and Algorithms. Built on the MERN stack, AlgoVision animates sorting and graph algorithms with step-by-step visuals, clear explanations, and a polished, responsive UI.

---

## Features

* Sorting Visualizer: Bubble, Selection, Insertion, Merge, Quick, Heap, Shell, Counting, Radix (LSD)
* Graph Visualizer: BFS, DFS, Dijkstra (server computes steps; client animates)
* Algorithm Insights: Selected algorithm shown as a heading with concise explanations
* Visual Feedback:

  * Sorting: active comparisons highlighted; sorted section retains a success color
  * Graphs: visited/settled nodes and relax steps animated
* Responsive, professional UI/UX with dark theme and refined controls
* Performance: memoized frames, efficient render updates, adjustable animation speeds

---

## Tech Stack

* **Client**: React + TypeScript, React Router, Hooks
* **Server**: Express + TypeScript (ESM)
* **Tooling**: npm workspaces, concurrently, ts-node, nodemon
* **Styling**: Custom CSS (dark theme, responsive layout)

---

## Screenshots / Demo

> *(Add demo images here)*

* Sorting Visualizer Demo
* Graph Visualizer Demo
* Responsive Dark Theme UI

---

## Screens

* **Home**: Intro section with CTAs for Sorting and Graph visualizers
* **Sorting**: Algorithm buttons, number-grid visualization, animation controls, final result panel, and algorithm explanation
* **Graphs**: Large centered SVG graph, algorithm buttons, animation controls, and algorithm explanation

---

## Quick Start

```bash
# 1) Install
npm install

# 2) Start dev (client at 3000, server at 4000)
npm run dev
```

* Client: [http://localhost:3000](http://localhost:3000)
* Server: [http://localhost:4000](http://localhost:4000)

---

## Scripts

* **Root**:

  * `npm run dev`: Start client and server together
* **Server**:

  * `npm run dev`: Run Express with ts-node (ESM) + nodemon
  * `npm run build`: Compile to `dist`
  * `npm start`: Run compiled server
* **Client**:

  * `npm start`: Start React app (CRA)

---

## Project Structure

```
AlgoVision/
  client/
    src/
      api/               # API wrappers
      components/        # Visual components (ArraySorter, GraphVisualizer)
      hooks/             # useAnimation, memo hooks
      lib/               # Sorting algorithms and frames
      pages/             # Home, SortingPage, GraphPage
      App.tsx            # Router: /, /sorting, /graphs
      index.css          # Global theme
  server/
    src/
      lib/               # Arrays/Graphs generation, algorithms (BFS/DFS/Dijkstra)
      routes/            # /api endpoints
      types/             # Shared TS types
      index.ts           # Express app
  README.md
  package.json           # Workspaces + dev script
```

---

## API (Server)

* `GET /api/array?size=30&min=1&max=100`
  Response:

  ```json
  { "data": [number] }
  ```
* `GET /api/graph?nodes=10&p=0.35&directed=false&weighted=true`
  Response:

  ```json
  {
    "nodes": ["A","B",...],
    "edges": [{ "from": "A", "to": "B", "weight": 5 }],
    "directed": false
  }
  ```
* `POST /api/bfs|/api/dfs|/api/dijkstra`
  Body:

  ```json
  { "graph": {...}, "start": "A" }
  ```

  Response:

  ```json
  { "steps": [{ "action": "visit", "payload": "A" }] }
  ```

---

## Algorithms Covered

### Sorting

* **Bubble**: Repeatedly swap adjacent elements if out of order.
* **Selection**: Select min for each position and swap.
* **Insertion**: Build sorted prefix by inserting current element in place.
* **Merge**: Divide-and-conquer; merge sorted halves.
* **Quick**: Partition around pivot; sort subarrays.
* **Heap**: Build max heap; repeatedly move max to end.
* **Shell**: Gap-based insertion sort; shrink gaps until 1.
* **Counting**: Count frequencies for small integer ranges.
* **Radix (LSD)**: Stable digit-by-digit sort from least significant.

**Visuals**:

* Active comparisons highlighted.
* Sorted elements retain a success color.
* Final sorted result shown below the animation grid.

### Graphs

* **BFS**: Layer-by-layer traversal using a queue.
* **DFS**: Depth-first exploration using recursion/stack.
* **Dijkstra**: Shortest path on weighted graphs; relax edges and settle nodes.

**Visuals**:

* Large centered graph in the viewport.
* Node visit/settle states highlighted.
* Edge relax steps displayed during Dijkstra.

---

## UI/UX Highlights

* Dark theme, gradient buttons, rounded cards, responsive grid
* Prominent algorithm selection buttons
* Mobile-friendly layout and controls

---

## Performance

* Frames generated and memoized to minimize re-renders
* Lightweight SVG for graphs
* Adjustable animation intervals

---

## Contributing

1. Fork the repository
2. Create a feature branch:

   ```bash
   git checkout -b feat/awesome-feature
   ```
3. Commit changes:

   ```bash
   git commit -m "feat: add awesome feature"
   ```
4. Push branch:

   ```bash
   git push origin feat/awesome-feature
   ```
5. Open a pull request

---

## License

MIT License. See `LICENSE` for details.

---

## Acknowledgements

* Inspiration: Classic algorithm visualizers and educational tools
* Thanks to the open-source community for React, Express, and TypeScript

---

## Author

**[Atharva Pachpute](https://www.linkedin.com/in/atharva-pachpute3/)** — *Creator of AlgoVision*
GitHub: [SyntaxNova](https://github.com/SyntaxNova)

