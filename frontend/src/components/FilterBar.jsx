import React from 'react';
import { useTransactions } from '../context/TransactionContext';

const FilterBar = () => {
  const { filterOptions, params, updateParams } = useTransactions();
  const { regions, categories, paymentMethods, genders, statuses, tags } = filterOptions;

  const handleChange = (e) => {
    updateParams({ [e.target.name]: e.target.value, page: 1 });
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
      <select name="region" value={params.region} onChange={handleChange} className={selectClass}>
        <option value="">Customer Region</option>
        {regions.map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      {/* Gender */}
      <select name="gender" value={params.gender} onChange={handleChange} className={selectClass}>
        <option value="">Gender</option>
        {genders.map(g => <option key={g} value={g}>{g}</option>)}
      </select>

      {/* Age Range (Mocking range as select for UI match, or keeping min/max inputs hidden/popover? Image shows dropdown "Age Range". I'll make a simple dropdown for predefined ranges or just keep it simple) */}
      <select name="minAge" value={params.minAge} onChange={(e) => updateParams({ minAge: e.target.value, maxAge: parseInt(e.target.value) + 10 })} className={selectClass}>
         <option value="">Age Range</option>
         <option value="18">18-28</option>
         <option value="29">29-39</option>
         <option value="40">40-50</option>
         <option value="50">50+</option>
      </select>

      {/* Product Category */}
      <select name="category" value={params.category} onChange={handleChange} className={selectClass}>
        <option value="">Product Category</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* Tags */}
      <select name="tags" value={params.tags} onChange={handleChange} className={selectClass}>
        <option value="">Tags</option>
        {tags?.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      {/* Payment Method */}
      <select name="paymentMethod" value={params.paymentMethod} onChange={handleChange} className={selectClass}>
        <option value="">Payment Method</option>
        {paymentMethods.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      {/* Date */}
      <input type="date" name="startDate" value={params.startDate} onChange={handleChange} className={`${selectClass} w-auto`} placeholder="Date" />

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
