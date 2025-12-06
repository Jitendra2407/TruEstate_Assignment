class QueryProcessor {
  constructor(data, queryString) {
    this.data = data;
    this.queryString = queryString;
    this.filteredData = [...data];
  }

  search(fields) {
    if (this.queryString.q) {
      const term = this.queryString.q.toLowerCase().trim();
      this.filteredData = this.filteredData.filter(item => {
        return fields.some(field => {
          const val = item[field];
          if (!val) return false;
          return String(val).toLowerCase().replace(/\s/g, '').includes(term.replace(/\s/g, '')) || 
                 String(val).toLowerCase().includes(term);
        });
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'q', 'sortBy', 'sortOrder', 'startDate', 'endDate', 'minAge', 'maxAge'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Exact match filters (supports multi-select via comma)
    Object.keys(queryObj).forEach(key => {
        if (queryObj[key]) {
            const values = String(queryObj[key]).split(',').map(v => v.trim());
            
            if (key === 'tags') {
                // For array fields like tags, check if ANY of the query values exist in the item's tags
                this.filteredData = this.filteredData.filter(item => 
                    item.tags && item.tags.some(tag => values.includes(tag))
                );
            } else {
                // For scalar fields, check if item value is in the query values list
                this.filteredData = this.filteredData.filter(item => values.includes(String(item[key])));
            }
        }
    });

    // Range filters
    if (this.queryString.startDate) {
        const date = new Date(this.queryString.startDate);
        if (!isNaN(date.getTime())) {
            this.filteredData = this.filteredData.filter(item => new Date(item.date) >= date);
        }
    }
    if (this.queryString.endDate) {
        const date = new Date(this.queryString.endDate);
        if (!isNaN(date.getTime())) {
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999); // Include entire end day
            this.filteredData = this.filteredData.filter(item => new Date(item.date) <= endDate);
        }
    }
    if (this.queryString.minAge) {
        const val = parseInt(this.queryString.minAge);
        if (!isNaN(val)) {
            this.filteredData = this.filteredData.filter(item => item.age >= val);
        }
    }
    if (this.queryString.maxAge) {
        const val = parseInt(this.queryString.maxAge);
        if (!isNaN(val)) {
            this.filteredData = this.filteredData.filter(item => item.age <= val);
        }
    }

    return this;
  }

  sort() {
    if (this.queryString.sortBy) {
      const sortBy = this.queryString.sortBy;
      const order = this.queryString.sortOrder === 'asc' ? 1 : -1;

      this.filteredData.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (sortBy === 'date') {
          valA = new Date(valA).getTime();
          valB = new Date(valB).getTime();
        } else if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return -1 * order;
        if (valA > valB) return 1 * order;
        return 0;
      });
    } else {
        // Default sort by date desc
        this.filteredData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    this.meta = {
        total: this.filteredData.length,
        page,
        limit,
        totalPages: Math.ceil(this.filteredData.length / limit)
    };
    
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
    return this;
  }

  getResult() {
    return {
        meta: this.meta,
        data: this.paginatedData || this.filteredData
    };
  }
}

module.exports = QueryProcessor;
