import React, { useState, useEffect } from 'react';
import { useTransactions } from '../context/TransactionContext';

const SearchBar = () => {
    const { updateParams, params } = useTransactions();
    const [localQuery, setLocalQuery] = useState(params.q || '');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (localQuery !== params.q) {
                updateParams({ q: localQuery, page: 1 });
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [localQuery, updateParams, params.q]);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border-none rounded-md leading-5 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Name, Phone no."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
