import React from 'react';
import { useTransactions } from '../context/TransactionContext';

const Pagination = () => {
  const { params, totalPages, setPage } = useTransactions();
  const { page } = params;

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end mt-4">
      <nav className="isolate inline-flex -space-x-px" aria-label="Pagination">
        {/* Simple Numbered Buttons */}
        {[...Array(totalPages)].map((_, i) => {
           const p = i + 1;
           // Show simple window logic
           if (totalPages <= 7 || p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
               return (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md mx-1 ${
                        page === p ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {p}
                </button>
               );
           } else if (p === page - 2 || p === page + 2) {
               return <span key={p} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700">...</span>;
           }
           return null;
        })}
      </nav>
    </div>
  );
};

export default Pagination;
