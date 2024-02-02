// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // createRootを使用してルートを作成
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);