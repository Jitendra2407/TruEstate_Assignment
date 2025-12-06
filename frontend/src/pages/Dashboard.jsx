import React from 'react';
import { TransactionProvider } from '../context/TransactionContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import TransactionTable from '../components/TransactionTable';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/StatsCards';

const Dashboard = () => {
  return (
    <TransactionProvider>
      <div className="flex bg-gray-50 min-h-screen font-sans">
        <Sidebar />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm z-10">
            <h1 className="text-xl font-bold text-gray-900">Sales Management System</h1>
            <div className="w-96">
                <SearchBar />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-8">
            <FilterBar />
            <StatsCards />
            <TransactionTable />
            <div className="mt-4 flex justify-end">
              <Pagination />
            </div>
          </main>
        </div>
      </div>
    </TransactionProvider>
  );
};

export default Dashboard;
