import React, { createContext, useContext } from 'react';
import useSalesData from '../hooks/useSalesData';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const salesData = useSalesData();

  return (
    <TransactionContext.Provider value={salesData}>
      {children}
    </TransactionContext.Provider>
  );
};
