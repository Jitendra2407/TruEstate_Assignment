# System Architecture

## Overview
### Data Flow (Backend)
1.  **Request**: `GET /api/transactions?q=john&region=Europe`
2.  **Route**: Parsed by `routes/api.js`.
3.  **Controller**: Invokes `TransactionService`.
4.  **Service**:
    -   Constructs SQL Query dynamically based on parameters.
    -   -> `WHERE ... LIKE ...` (Search)
    -   -> `WHERE ... IN (...)` (Multi-select Filters)
    -   -> `WHERE date >= ...` (Range Filters)
    -   -> `ORDER BY ...` (Sorting)
    -   -> `LIMIT ... OFFSET ...` (Pagination)
    -   Executes query against SQLite database.
5.  **Response**: JSON object containing `data` chunk and metadata (`total`, `page`, `totalPages`).

## Frontend Architecture
The frontend is a Single Page Application (SPA) built with React and Vite.
- **UI Framework**: TailwindCSS is used for a "Rich Aesthetic" with glassmorphism effects and responsive design.
- **Component Design**: Modular components (`SearchBar`, `FilterPanel`, `TransactionTable`, `Pagination`) that are purely presentational or connected via Context.

### State Management
We use the **React Context API** (`TransactionContext`) for a centralized state store.
- **State**:
    -   `transactions`: Array of current page data.
    -   `params`: Object storing all active filters (search `q`, `page`, `sortBy`, `filters`).
    -   `filterOptions`: Unique values for dropdowns loaded from API.
- **Logic**:
    -   `updateParams`: Updates state and resets `page` to 1 (unless paging).
    -   `useEffect`: Watches `params`, debounces the input, and calls the API service.

### Pipeline (Frontend to Backend)
1.  **User Interaction**: User types in Search Bar.
2.  **Debounce**: Submits update after 300ms delay.
3.  **Service Call**: `fetchTransactions(params)` converts object to query string.
4.  **Network**: HTTP GET request to Backend.
5.  **State Update**: Context receives new data -> populates `transactions` -> Table Re-renders.

## Design Decisions
1.  **SQLite Database**: Chosen for robust SQL querying capabilities (required for complex filtering/sorting) while remaining easy to set up (serverless/file-based) for the assignment.
2.  **Debounced Search**: Prevents API spamming while typing.
3.  **Context Over Redux**: Sufficient specific complexity for this scope without boilerplate.
4.  **TailwindCSS**: Allows rapid UI iteration and consistent design tokens.
