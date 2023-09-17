import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import ThemeProvider from './shared/providers/theme-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
  // <React.StrictMode>
  // </React.StrictMode>
);
