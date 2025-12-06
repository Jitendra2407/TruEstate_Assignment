import React from 'react';
import { useTransactions } from '../context/TransactionContext';

const FiltersPanel = () => {
  const { filterOptions, params, updateParams } = useTransactions();
  const { regions, categories, paymentMethods, genders, statuses, brands, storeLocations, customerTypes, deliveryTypes, tags } = filterOptions;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateParams({ [name]: value, page: 1 });
  };

  const handleReset = () => {
    updateParams({
      region: '', gender: '', category: '', paymentMethod: '', status: '',
      brand: '', storeLocation: '', customerType: '', deliveryType: '', tags: '',
      startDate: '', endDate: '', minAge: '', maxAge: '', page: 1, q: ''
    });
  };

  return (
    <div className="glass-panel p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
        <button onClick={handleReset} className="text-sm text-primary hover:text-primary/70 font-medium">Reset All</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Customer Type */}
        <select name="customerType" value={params.customerType} onChange={handleChange} className="input-field">
          <option value="">All Customer Types</option>
          {customerTypes?.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Region */}
        <select name="region" value={params.region} onChange={handleChange} className="input-field">
          <option value="">All Regions</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        {/* Store Location */}
        <select name="storeLocation" value={params.storeLocation} onChange={handleChange} className="input-field">
          <option value="">All Stores</option>
          {storeLocations?.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* Category */}
        <select name="category" value={params.category} onChange={handleChange} className="input-field">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Brand */}
        <select name="brand" value={params.brand} onChange={handleChange} className="input-field">
          <option value="">All Brands</option>
          {brands?.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        {/* Tags */}
        <select name="tags" value={params.tags} onChange={handleChange} className="input-field">
          <option value="">All Tags</option>
          {tags?.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        {/* Status */}
        <select name="status" value={params.status} onChange={handleChange} className="input-field">
          <option value="">All Statuses</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* Payment Method */}
        <select name="paymentMethod" value={params.paymentMethod} onChange={handleChange} className="input-field">
          <option value="">All Payment Methods</option>
          {paymentMethods.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        {/* Delivery Type */}
        <select name="deliveryType" value={params.deliveryType} onChange={handleChange} className="input-field">
          <option value="">All Delivery Types</option>
          {deliveryTypes?.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        {/* Gender */}
        <select name="gender" value={params.gender} onChange={handleChange} className="input-field">
          <option value="">All Genders</option>
          {genders.map(g => <option key={g} value={g}>{g}</option>)}
        </select>

        {/* Date Range */}
        <input type="date" name="startDate" value={params.startDate} onChange={handleChange} className="input-field" placeholder="Start Date" />
        <input type="date" name="endDate" value={params.endDate} onChange={handleChange} className="input-field" placeholder="End Date" />

        {/* Age Range */}
        <div className="flex space-x-2">
            <input type="number" name="minAge" value={params.minAge} onChange={handleChange} className="input-field" placeholder="Min Age" />
            <input type="number" name="maxAge" value={params.maxAge} onChange={handleChange} className="input-field" placeholder="Max Age" />
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
