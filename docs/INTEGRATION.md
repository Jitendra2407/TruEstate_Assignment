# Integration Layer & API Contract

## Overview
The integration layer bridges the React Frontend and Node.js Backend, ensuring seamless data flow, state synchronization, and error handling.

## 1. API Request Builder
The frontend constructs API requests using a unified `params` object. This is converted to a query string using `URLSearchParams`.

### Frontend State Mappings
| Frontend State (`params`) | Backend Query Param | Type | Description |
| :--- | :--- | :--- | :--- |
| `q` | `q` | string | Search term (Name/Phone) |
| `region` | `region` | string | Exact filter |
| `category` | `category` | string | Exact filter |
| `paymentMethod` | `paymentMethod` | string | Exact filter |
| `status` | `status` | string | Exact filter |
| `sortBy` | `sortBy` | string | Sort field |
| `sortOrder` | `sortOrder` | string | 'asc' or 'desc' |
| `page` | `page` | number | Pagination index |
| `limit` | `limit` | number | Items per page (default 10) |

### Request Builder Logic
Located in `frontend/src/services/api.js`:
```javascript
export const fetchTransactions = async (params) => {
  const query = new URLSearchParams(params).toString();
  // Clean empty keys to keep URL clean
  // (Logic implemented to remove null/empty strings before sending)
  const response = await fetch(`${API_URL}/transactions?${query}`);
  // ...
};
```

## 2. Query Param Persistence Strategy
To ensure the application state is shareable and persistent across reloads, we sync the `params` state with the browser's URL Query Parameters.

**Strategy**: `useSalesData` Hook synchronization.
- **On Mount**: Read `window.location.search` -> Populate `params`.
- **On Update**: `setParams` -> Update `window.history` (replaceState to avoid cluttering history stack, or pushState for major changes).

## 3. Example Requests & Responses

### Request
`GET /api/transactions?q=John&region=Europe&page=1&limit=10`

### Response (Success 200)
```json
{
  "meta": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  },
  "data": [
    {
      "id": 1,
      "customerName": "John Doe",
      "region": "Europe",
      "status": "Completed",
      ...
    }
  ]
}
```

### Response (Error 500)
```json
{
  "success": false,
  "error": "Database connection failed"
}
```

## 4. UI State Handling

### Loading State
- **Variable**: `loading` (boolean)
- **UI**: `TransactionTable` displays a "Loading..." spinner/skeleton when true.
- **Trigger**: Sets to `true` start of `loadTransactions`, `false` in `finally`.

### Empty Results
- **Check**: `transactions.length === 0 && !loading`
- **UI**: Table displays "No transactions found" message.

### Error Handling
- **Variable**: `error` (string | null)
- **UI**: Displays error alert at top of Dashboard if present.
- **Recovery**: "Try Again" button or auto-retry (optional).
