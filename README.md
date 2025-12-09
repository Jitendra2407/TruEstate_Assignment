# SaleSphere - Retail Sales Management System

**Live Application**: [https://tru-estate-assignment.vercel.app/](https://tru-estate-assignment.vercel.app/)

## Overview
SaleSphere is a robust Retail Sales Management System designed to handle large datasets of sales transactions. It features a responsive dashboard for visualizing key metrics and provides advanced data manipulation capabilities including full-text search, multi-criteria filtering, properties-based sorting, and efficient server-side pagination.

## Tech Stack
*   **Frontend**: React.js (Vite), TailwindCSS, Context API
*   **Backend**: Node.js, Express.js, Better-SQLite3
*   **Database**: SQLite (Embedded relational database)

## Search Implementation Summary
Search is implemented using SQL `LIKE` queries with `OR` conditions across multiple fields (`customer_name`, `phone_number`, `product_name`, `brand`). The search is debounced on the frontend (300ms) to optimize performance and works in conjunction with all active filters and sorting options.

## Filter Implementation Summary
Filters support multi-select functionality allowing users to select multiple values for fields like Region, Category, and Payment Method. The backend dynamically constructs `WHERE IN (...)` clauses based on comma-separated values passed via query parameters. Date ranges and numeric ranges (Age) are handled via comparative operators (`>=`, `<=`).

## Sorting Implementation Summary
Sorting is server-side and fully preserves the state of active search and filters. It supports sorting by Date, Quantity, Price, and Customer Name in both ascending and descending orders using dynamic `ORDER BY` clauses.

## Pagination Implementation Summary
Pagination is server-side (limit/offset strategy) to handle large datasets efficiently. The API returns metadata (`total`, `page`, `totalPages`) which drives the frontend pagination controls. Navigating pages preserves all current search, filter, and sort states.

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    cd backend && npm install
    cd ../frontend && npm install
    ```

2.  **Start Backend**
    ```bash
    cd backend
    npm start
    # Server runs on http://localhost:3001
    ```

3.  **Start Frontend**
    ```bash
    cd frontend
    npm run dev
    # App runs on http://localhost:5173
    ```

For detailed documentation, see [docs/architecture.md](docs/architecture.md).
