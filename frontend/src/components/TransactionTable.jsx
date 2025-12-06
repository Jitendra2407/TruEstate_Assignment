import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const TransactionTable = () => {
  const { transactions, loading, error, params, updateParams } = useTransactions();
  const [copiedId, setCopiedId] = useState(null);

  const handleSort = (field) => {
    const order = params.sortBy === field && params.sortOrder === 'asc' ? 'desc' : 'asc';
    updateParams({ sortBy: field, sortOrder: order });
  };
  
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (loading) return (
    <div className="w-full h-64 flex items-center justify-center bg-white rounded-lg border border-gray-200">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  if (transactions.length === 0) return (
    <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
      <p className="text-gray-500">No transactions found.</p>
    </div>
  );

  // Helper for Headers
  const Th = ({ field, label, sortable = true }) => (
    <th 
      className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${sortable ? 'cursor-pointer hover:text-gray-700' : ''}`}
      onClick={() => sortable && handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {sortable && params.sortBy === field && (
          <span className="text-indigo-600">{params.sortOrder === 'asc' ? '↑' : '↓'}</span>
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th field="id" label="Transaction ID" />
              <Th field="date" label="Date" />
              <Th field="customerId" label="Customer ID" sortable={false} />
              <Th field="customerName" label="Customer Name" />
              <Th field="phoneNumber" label="Phone Number" sortable={false} />
              <Th field="gender" label="Gender" />
              <Th field="age" label="Age" />
              <Th field="productCategory" label="Product Category" />
              <Th field="quantity" label="Quantity" />
              <Th field="finalAmount" label="Total Amount" />
              <Th field="region" label="Customer Region" />
              <Th field="productId" label="Product ID" sortable={false} />
              <Th field="employeeName" label="Employee Name" sortable={false} />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500 font-mono text-opacity-80">{t.id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{t.customerId || 'N/A'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">{t.customerName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                    <span>{t.phoneNumber}</span>
                    <button 
                        onClick={() => handleCopy(t.phoneNumber, t.id)}
                        className={`transition-colors ${copiedId === t.id ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`} 
                        title="Copy"
                    >
                        {copiedId === t.id ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        )}
                    </button>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{t.gender}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{t.age}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{t.productCategory}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-bold">{t.quantity.toString().padStart(2, '0')}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(t.finalAmount)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{t.region}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{t.productId || 'N/A'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{t.employeeName || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
