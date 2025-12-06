# Backend API Specification & Architecture

## Architecture Overview
The backend follows a layered architecture to ensure separation of concerns:
1.  **Controller Layer** (`controllers/`): Handles HTTP requests, parses query parameters, validates input, and formats responses.
2.  **Service Layer** (`services/`): Contains business logic (search algorithms, filtering rules, sorting, pagination).
3.  **Data Layer / Utility** (`utils/`, `data/`): manages dataset loading and parsing.

## API Contract

### 1. Get Transactions (Unified Endpoint)
**Endpoint**: `GET /api/transactions`
**Description**: fetches a paginated list of transactions with applied search, filters, and sorting.

#### Request Parameters (Query String)
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `q` | string | No | - | Search term for Customer Name or Phone (case-insensitive) |
| `region` | string | No | - | Exact match for Region |
| `gender` | string | No | - | Exact match for Gender |
| `category` | string | No | - | Exact match for Product Category |
| `paymentMethod` | string | No | - | Exact match for Payment Method |
| `status` | string | No | - | Exact match for Transaction Status |
| `startDate` | ISO Date | No | - | Filter transactions after or on this date |
| `endDate` | ISO Date | No | - | Filter transactions before or on this date |
| `minAge` | number | No | - | Minimum customer age |
| `maxAge` | number | No | - | Maximum customer age |
| `sortBy` | string | No | `date` | Field to sort by (`date`, `amount`, `customerName`) |
| `sortOrder` | string | No | `desc` | Sort direction (`asc` or `desc`) |
| `page` | number | No | `1` | Page number (1-based index) |
| `limit` | number | No | `10` | Number of items per page |

#### Response DTO
```json
{
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15
  },
  "data": [
    {
      "id": 1,
      "customerName": "John Doe",
      "phoneNumber": "+1 555 123 4567",
      "age": 30,
      "gender": "Male",
      "region": "North America",
      "productCategory": "Electronics",
      "paymentMethod": "Credit Card",
      "quantity": 2,
      "price": 120.50,
      "date": "2023-10-27T10:00:00.000Z",
      "status": "Completed"
    }
  ]
}
```

### 2. Get Filters
**Endpoint**: `GET /api/filters`
**Description**: Returns unique values for UI dropdowns.

#### Response DTO
```json
{
  "regions": ["North America", "Europe", ...],
  "categories": ["Electronics", "Clothing", ...],
  "paymentMethods": ["Credit Card", "PayPal", ...],
  "genders": ["Male", "Female"],
  "statuses": ["Completed", "Pending", ...]
}
```

## Detailed Logic Specification

### Dataset Processing
- **Loading**: On server start, read `data/transactions.json`.
- **Parsing**: Parse JSON into an in-memory array.
- **Indexing**: (Optional for V1) Create lookup maps if performance requires it.

### Search Logic
- **Scope**: `customerName` AND `phoneNumber`.
- **Method**: Substring match (contains).
- **Sanitization**: Case-insensitive, strip whitespace from phone numbers for flexible matching.

### Filtering Logic
- ALL active filters are applied with AND logic.
- **Ranges**:
    - Dates: `transaction.date >= startDate` AND `transaction.date <= endDate`.
    - Age: `transaction.age >= minAge` AND `transaction.age <= maxAge`.

### Sorting Logic
- **Date**: parsing ISO strings to timestamps.
- **String** (Name): LocaleCompare.
- **Number** (Quantity/Price): Standard numeric comparison.

### Pagination Logic
- `startIndex = (page - 1) * limit`
- `endIndex = startIndex + limit`
- `result = filteredArray.slice(startIndex, endIndex)`
