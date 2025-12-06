import { useState, useCallback, useEffect } from 'react';
import { fetchTransactions, fetchFilters } from '../services/api';

const useSalesData = () => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [aggregates, setAggregates] = useState({ totalQuantity: 0, totalAmount: 0, totalDiscount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [filterOptions, setFilterOptions] = useState({
    regions: [], categories: [], paymentMethods: [], genders: [], statuses: [],
    brands: [], storeLocations: [], customerTypes: [], deliveryTypes: [], tags: []
  });

  const [params, setParams] = useState(() => {
    // Initial load from URL
    const searchParams = new URLSearchParams(window.location.search);
    return {
      page: parseInt(searchParams.get('page')) || 1,
      limit: parseInt(searchParams.get('limit')) || 10,
      q: searchParams.get('q') || '',
      sortBy: searchParams.get('sortBy') || 'date',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      region: searchParams.get('region') || '',
      gender: searchParams.get('gender') || '',
      category: searchParams.get('category') || '',
      paymentMethod: searchParams.get('paymentMethod') || '',
      status: searchParams.get('status') || '',
      startDate: searchParams.get('startDate') || '',
      endDate: searchParams.get('endDate') || '',
      minAge: searchParams.get('minAge') || '',
      maxAge: searchParams.get('maxAge') || '',
      // New Filters
      brand: searchParams.get('brand') || '',
      storeLocation: searchParams.get('storeLocation') || '',
      customerType: searchParams.get('customerType') || '',
      deliveryType: searchParams.get('deliveryType') || '',
      tags: searchParams.get('tags') || ''
    };
  });

  // Sync params to URL
  useEffect(() => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [params]);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTransactions(params);
      setTransactions(response.data);
      setTotal(response.meta.total);
      setTotalPages(response.meta.totalPages);
      if (response.meta.aggregates) {
          setAggregates(response.meta.aggregates);
      }
    } catch (err) {
      setError(err.message);
      setTransactions([]); // Clear on error
    } finally {
      setLoading(false);
    }
  }, [params]);

  const loadFilters = async () => {
    try {
      const data = await fetchFilters();
      setFilterOptions(data);
    } catch (err) {
      console.error('Failed to load filter options', err);
    }
  };

  const updateParams = useCallback((newParams) => {
    setParams(prev => {
      // If any filter changes (not page/sort), reset page to 1
      const isFilterChange = Object.keys(newParams).some(key => 
        !['page', 'sortBy', 'sortOrder'].includes(key)
      );
      
      return { 
        ...prev, 
        ...newParams, 
        page: isFilterChange ? 1 : (newParams.page || prev.page) 
      };
    });
  }, []);

  const setPage = useCallback((page) => {
    updateParams({ page });
  }, [updateParams]);

  // Initial load of filters
  useEffect(() => {
    loadFilters();
  }, []);

  // Debounced fetch for transactions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadTransactions();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [loadTransactions]);

  return {
    transactions,
    total,
    totalPages,
    aggregates,
    loading,
    error,
    params,
    filterOptions,
    updateParams,
    setPage
  };
};

export default useSalesData;
