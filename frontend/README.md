# Frontend - Retail Sales Management System

## Overview
The frontend is a distinct **React** application built with **Vite**. It features a modern, responsive UI styled with **TailwindCSS**.

## Architecture
- **State Management**: Custom hook `useSalesData` + React Context (`TransactionContext`) manages unified query state.
- **URL Sync**: All filters and search parameters are synchronized with the URL for shareability and persistence.
- **Components**: Modular design with separate components for `SearchBar`, `FiltersPanel`, `TransactionTable`, etc.

## Key Features
- **Debounced Search**: Prevents API spamming while typing.
- **Responsive Design**: Mobile-friendly `SortDropdown` and layout.
- **Smart Feedback**: Loading states and empty result messages.
- **Filter Reset**: One-click reset for all active filters.

## Scripts
- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview production build.

See [../docs/FRONTEND_ARCHITECTURE.md](../docs/FRONTEND_ARCHITECTURE.md) for architecture diagrams.
