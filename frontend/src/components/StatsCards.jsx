import React from 'react';
import { useTransactions } from '../context/TransactionContext';

const StatsCards = () => {
  const { aggregates } = useTransactions();
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Units */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
         <div className="flex justify-between items-start">
            <span className="text-gray-500 text-sm font-medium">Total units sold</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         </div>
         <div className="text-2xl font-bold text-gray-900 mt-2">{aggregates.totalQuantity}</div>
      </div>

      {/* Total Amount */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
         <div className="flex justify-between items-start">
            <span className="text-gray-500 text-sm font-medium">Total Amount</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         </div>
         <div className="text-xl font-bold text-gray-900 mt-2">
            {formatCurrency(aggregates.totalAmount)}
         </div>
      </div>

      {/* Total Discount */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
         <div className="flex justify-between items-start">
            <span className="text-gray-500 text-sm font-medium">Total Discount</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         </div>
         <div className="text-xl font-bold text-gray-900 mt-2">
             {formatCurrency(aggregates.totalDiscount)}
         </div>
      </div>
    </div>
  );
};

export default StatsCards;
