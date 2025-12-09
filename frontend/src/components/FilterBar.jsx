import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import MultiSelect from './MultiSelect';

const FilterBar = () => {
  const { filterOptions, params, updateParams } = useTransactions();
  const { regions, categories, paymentMethods, genders, statuses, tags, brands, deliveryTypes, customerTypes } = filterOptions;

  const handleChange = (e) => {
    updateParams({ [e.target.name]: e.target.value, page: 1 });
  };

  const handleMultiChange = (name, value) => {
    updateParams({ [name]: value, page: 1 });
  };

  const handleReset = () => {
    updateParams({
      region: '', gender: '', category: '', paymentMethod: '', status: '',
      brand: '', storeLocation: '', customerType: '', deliveryType: '', tags: '',
      startDate: '', endDate: '', minAge: '', maxAge: '', page: 1, q: '' 
    }); 
  };

  // Helper for dropdown style
  const selectClass = "bg-gray-100 border-none text-gray-600 text-sm rounded-md px-3 py-1.5 focus:ring-0 cursor-pointer hover:bg-gray-200 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Reset */}
      <button onClick={handleReset} className="p-2 text-gray-500 hover:text-red-500 transition-colors" title="Reset Filters">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
      </button>

      {/* Customer Region */}
      <MultiSelect 
        label="Region" 
        options={regions} 
        selected={params.region} 
        onChange={(val) => handleMultiChange('region', val)} 
      />

      {/* Gender */}
      <MultiSelect 
        label="Gender" 
        options={genders} 
        selected={params.gender} 
        onChange={(val) => handleMultiChange('gender', val)} 
      />

      {/* Product Category */}
      <MultiSelect 
        label="Category" 
        options={categories} 
        selected={params.category} 
        onChange={(val) => handleMultiChange('category', val)} 
      />

      {/* Tags */}
      <MultiSelect 
        label="Tags" 
        options={tags} 
        selected={params.tags} 
        onChange={(val) => handleMultiChange('tags', val)} 
      />

      {/* Payment Method */}
      <MultiSelect 
        label="Payment" 
        options={paymentMethods} 
        selected={params.paymentMethod} 
        onChange={(val) => handleMultiChange('paymentMethod', val)} 
      />

      {/* Status */}
      <MultiSelect 
        label="Status" 
        options={statuses} 
        selected={params.status} 
        onChange={(val) => handleMultiChange('status', val)} 
      />

      {/* Age Range */}
      <select name="minAge" value={params.minAge} onChange={(e) => updateParams({ minAge: e.target.value, maxAge: e.target.value ? parseInt(e.target.value) + 10 : '' })} className={selectClass}>
         <option value="">Age Range</option>
         <option value="18">18-28</option>
         <option value="29">29-39</option>
         <option value="40">40-50</option>
         <option value="50">50+</option>
      </select>

      {/* Date */}
      <input type="date" name="startDate" value={params.startDate} onChange={handleChange} className={`${selectClass} w-auto`} placeholder="Start Date" />
      
      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Sort */}
      <div className="flex items-center space-x-2">
         <span className="text-sm text-gray-500">Sort by:</span>
         <select 
            value={`${params.sortBy}-${params.sortOrder}`} 
            onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                updateParams({ sortBy, sortOrder });
            }} 
            className="bg-transparent text-sm font-medium text-gray-700 focus:ring-0 border-none cursor-pointer"
         >
            <option value="customerName-asc">Customer Name (A-Z)</option>
            <option value="customerName-desc">Customer Name (Z-A)</option>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="price-desc">Price (High-Low)</option>
            <option value="price-asc">Price (Low-High)</option>
         </select>
      </div>
    </div>
  );
};

export default FilterBar;
