import { Router } from 'express';
import { generateArray } from '../lib/arrays.js';
import { generateGraph } from '../lib/graphs.js';
import { bfs, dfs, dijkstra } from '../lib/algorithms.js';
const router = Router();
router.get('/array', (req, res) => {
    const size = Number(req.query.size ?? 20);
    const min = Number(req.query.min ?? 1);
    const max = Number(req.query.max ?? 100);
    const arr = generateArray({ size, min, max });
    res.json({ data: arr });
});
router.get('/graph', (req, res) => {
    const numNodes = Number(req.query.nodes ?? 8);
    const edgeProbability = Number(req.query.p ?? 0.3);
    const directed = req.query.directed === 'true';
    const weighted = req.query.weighted === 'true';
    const g = generateGraph({ numNodes, edgeProbability, directed, weighted });
    res.json(g);
});
router.post('/bfs', (req, res) => {
    const { graph, start } = req.body;
    const steps = bfs(graph, String(start));
    res.json({ steps });
});
router.post('/dfs', (req, res) => {
    const { graph, start } = req.body;
    const steps = dfs(graph, String(start));
    res.json({ steps });
});
router.post('/dijkstra', (req, res) => {
    const { graph, start } = req.body;
    const steps = dijkstra(graph, String(start));
    res.json({ steps });
});
export default router;
