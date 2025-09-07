import React from 'react';
import { GraphVisualizer } from '../components/GraphVisualizer';

export const GraphPage: React.FC = () => {
  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Graph Algorithms</h2>
      </header>
      <GraphVisualizer />
    </div>
  );
};


