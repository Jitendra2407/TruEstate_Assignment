import React from 'react';
import { useTransactions } from '../context/TransactionContext';

const SortDropdown = () => {
  const { params, updateParams } = useTransactions();

  const handleChange = (e) => {
    const value = e.target.value;
    if (!value) return;
    const [sortBy, sortOrder] = value.split('-');
    updateParams({ sortBy, sortOrder });
  };

  const currentValue = `${params.sortBy}-${params.sortOrder}`;

  return (
    <div className="glass-panel p-4 mb-4 md:hidden">
      <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
      <select 
        value={currentValue} 
        onChange={handleChange} 
        className="input-field"
      >
        <option value="date-desc">Date: Newest to Oldest</option>
        <option value="date-asc">Date: Oldest to Newest</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="quantity-desc">Quantity: High to Low</option>
        <option value="quantity-asc">Quantity: Low to High</option>
        <option value="customerName-asc">Name: A to Z</option>
        <option value="customerName-desc">Name: Z to A</option>
      </select>
    </div>
  );
};

export default SortDropdown;
