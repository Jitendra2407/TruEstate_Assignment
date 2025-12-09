const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const fetchTransactions = async (params) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/transactions?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

export const fetchFilters = async () => {
  const response = await fetch(`${API_URL}/filters`);
  if (!response.ok) {
    throw new Error('Failed to fetch filters');
  }
  return response.json();
};
