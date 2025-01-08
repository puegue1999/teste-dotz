// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';  // Certifique-se de que esse caminho esteja correto
import reportWebVitals from './reportWebVitals';  // Certifique-se de que esse caminho esteja correto

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
