- **Price** (High/Low)
- **Quantity** (High/Low)
- **Customer Name** (A-Z/Z-A)

### 📄 Pagination
Server-side pagination ensures efficiency. The API returns `meta` data (total pages, current page) which the frontend uses to generate a smart pagination control with "Previous", "Next", and page number navigation.

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
    # App runs on http://localhost:5173 (or similar)
    ```

For detailed documentation, see [docs/SETUP.md](docs/SETUP.md).
