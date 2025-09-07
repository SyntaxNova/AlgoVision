import React, { useEffect, useMemo, useState } from 'react';
import { fetchArray } from '../api';
import { useAnimation } from '../hooks/useAnimation';
import { ALL_SORTS, SortFrames } from '../lib/sorts';

export const ArraySorter: React.FC<{ initialAlgoKey?: string; externalAlgoKey?: string }>= ({ initialAlgoKey = 'quick', externalAlgoKey }) => {
  const [arr, setArr] = useState<number[]>([]);
  const [algoKey, setAlgoKey] = useState<string>(initialAlgoKey);
  const [speed, setSpeed] = useState(80);
  const data: SortFrames = useMemo(() => {
    const algo = ALL_SORTS.find((a) => a.key === algoKey) ?? ALL_SORTS[0];
    return algo.fn(arr);
  }, [arr, algoKey]);
  const { frame, index, total, play, stop, reset, isPlaying } = useAnimation(data.frames, speed);

  useEffect(() => {
    (async () => setArr(await fetchArray(24, 5, 99)))();
  }, []);

  const sorted = data.result;

  useEffect(() => {
    if (externalAlgoKey) {
      setAlgoKey(externalAlgoKey);
      reset();
    }
  }, [externalAlgoKey, reset]);

  return (
    <div style={{ padding: 16, background: '#0b1220', color: '#e2e8f0', borderRadius: 12 }}>
      <h2 style={{ margin: '0 0 12px 0' }}>Sorting Visualizer</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={async () => { setArr(await fetchArray(24, 5, 99)); reset(); }}>New Array</button>
        {!externalAlgoKey && (
          <select value={algoKey} onChange={(e) => { setAlgoKey(e.target.value); reset(); }}>
            {ALL_SORTS.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
          </select>
        )}
        <button onClick={play} disabled={isPlaying || data.frames.length === 0}>Play</button>
        <button onClick={stop} disabled={!isPlaying}>Pause</button>
        <button onClick={reset}>Reset</button>
        <label>Speed(ms): <input type="number" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} style={{ width: 80 }} /></label>
        <span>{index + 1}/{total}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 8, marginTop: 16 }}>
        {(frame || arr).map((v, i) => (
          <div key={i} style={{ background: '#111827', padding: '10px 0', textAlign: 'center', borderRadius: 8, border: '1px solid #1f2937' }}>{v}</div>
        ))}
      </div>
      <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <strong>Result:</strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 8, flex: 1 }}>
          {sorted.map((v, i) => (
            <div key={i} style={{ background: '#14b8a6', color: '#062925', padding: '8px 0', textAlign: 'center', borderRadius: 8 }}>{v}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
