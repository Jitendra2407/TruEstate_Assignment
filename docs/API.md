# API Documentation

## Base URL
`http://localhost:3001/api`

## Endpoints

### 1. Get Transactions
**GET** `/transactions`

Retrieves a paginated list of transactions with optional filtering and sorting.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `q`: Search query (Customer Name or Phone Number)
- `sortBy`: Field to sort by (default: 'date')
- `sortOrder`: 'asc' or 'desc' (default: 'desc')
- `region`: Filter by region
- `category`: Filter by product category
- `gender`: Filter by gender
- `paymentMethod`: Filter by payment method
- `status`: Filter by status
- `startDate`: Filter by date range start (ISO format)
- `endDate`: Filter by date range end
- `minAge`: Filter by minimum age
- `maxAge`: Filter by maximum age

**Response:**
```json
{
  "data": [ ... ],
  "total": 150,
  "page": 1,
  "totalPages": 15
}
```

### 2. Get Filters
**GET** `/filters`

Retrieves unique values for filter dropdowns.

**Response:**
```json
{
  "regions": [...],
  "categories": [...],
  "paymentMethods": [...],
  "genders": [...],
  "statuses": [...]
}
```
