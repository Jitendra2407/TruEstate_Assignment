# Retail Sales Management System Setup Guide

## Prerequisites
- Node.js (v18+)
- npm

## Installation

1.  **Clone/Open the repository**.
2.  **Install dependencies**:

    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

## Running the Application

### Backend
Start the backend server (runs on port 3001):
```bash
cd backend
npm start
# or
node server.js
```

### Frontend
Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Features
- **Search**: Full-text search for Customer Name and Phone Number.
- **Filters**: Region, Gender, Age, Category, Payment Method, Date Range, Status.
- **Sorting**: Date (Newest/Oldest), Quantity, Price.
- **Pagination**: Browse through transaction records.

## API Endpoints
- `GET /api/transactions`: Search and filter transactions.
- `GET /api/filters`: Get available filter options.
