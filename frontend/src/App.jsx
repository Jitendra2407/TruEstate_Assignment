import React from 'react';
import { TransactionProvider } from './context/TransactionContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <TransactionProvider>
      <Dashboard />
    </TransactionProvider>
  );
}

export default App;
