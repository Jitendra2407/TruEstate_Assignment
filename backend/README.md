# Backend - Retail Sales Management System

## Overview
The backend is a Node.js/Express REST API that serves transaction data. It is architected with a clean separation of concerns using Controllers, Services, and Utilities.

## Architecture
- **Controllers**: Handle HTTP requests and responses. (`controllers/transactionController.js`)
- **Services**: Contain business logic. (`services/transactionService.js`)
- **Models**: Data access layer. (`models/Transactions.js`)
- **Utils**: Helper classes like `QueryProcessor` for advanced filtering logic.

## Key Features
- **Centralized Query Processor**: A specific class (`utils/QueryProcessor.js`) handles the chaining of search, filter, sort, and pagination methods.
- **Error Handling**: Global middleware (`middleware/errorHandler.js`) catches and formats all errors standardly.
- **Data Seeding**: A utility script (`utils/seeder.js`) generates realistic mock data.

## API Endpoints
- `GET /api/transactions`: Main endpoint for data retrieval.
- `GET /api/filters`: Returns unique values for UI dropdowns.

See [../docs/API_SPEC.md](../docs/API_SPEC.md) for full details.
