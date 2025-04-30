import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TableProvider } from './context/TableContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TableProvider>
        <App />
        </TableProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);