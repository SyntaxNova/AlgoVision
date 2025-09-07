import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: '1px solid #1f2937', background: '#0b1220', color: '#e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ margin: 0 }}>AlgoVision</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          <a href="#sorts" style={{ color: '#93c5fd', textDecoration: 'none' }}>Sorts</a>
          <a href="#graphs" style={{ color: '#93c5fd', textDecoration: 'none' }}>Graphs</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" style={{ color: '#93c5fd', textDecoration: 'none' }}>GitHub</a>
        </nav>
      </header>
      <main style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, padding: 32, background: '#0f172a', minHeight: '100vh' }}>
        <section style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, margin: '12px 0' }}>Master Algorithms Visually</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            AlgoVision helps you learn by seeing. Explore sorting and graph algorithms step-by-step with
            smooth animations, adjustable speed, and interactive controls. Perfect for students, interview prep,
            and workshops.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            <Link to="/sorting"><button>Sorting Algorithms Visualizer</button></Link>
            <Link to="/graphs"><button>Graph Algorithms Visualizer</button></Link>
          </div>
        </section>
      </main>
    </div>
  );
};
