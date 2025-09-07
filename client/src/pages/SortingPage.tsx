import React, { useState } from 'react';
import { ArraySorter } from '../components/ArraySorter';
import { ALL_SORTS } from '../lib/sorts';

export const SortingPage: React.FC = () => {
  const [algo, setAlgo] = useState<string>('quick');
  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Sorting Algorithms</h2>
      </header>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {ALL_SORTS.map((s) => (
          <button key={s.key} onClick={() => setAlgo(s.key)} style={{ opacity: algo === s.key ? 1 : 0.8 }}>
            {s.name}
          </button>
        ))}
      </div>
      <ArraySorter externalAlgoKey={algo} />
    </div>
  );
};


