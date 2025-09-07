import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { SortingPage } from './pages/SortingPage';
import { GraphPage } from './pages/GraphPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<SortingPage />} />
        <Route path="/graphs" element={<GraphPage />} />
        <Route path="*" element={<div style={{ padding: 24 }}><h2>Not Found</h2><Link to="/">Go home</Link></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
