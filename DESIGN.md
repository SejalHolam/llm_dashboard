# Dynamic LLM Monitoring Dashboard – Design Document

## 1. Architecture Overview

I built the dashboard as a modular React application where each widget is an independent component responsible for fetching and visualizing its own data.

The application consists of the following main layers:

- **Dashboard Layout Layer** – Managed by `react-grid-layout` for draggable and resizable widgets.
- **State Management Layer** – Managed using Zustand to store widget configuration and layout.
- **Server State Layer** – Managed using TanStack Query to fetch and cache data.
- **Visualization Layer** – Implemented using Recharts for displaying charts.

This separation ensures that layout management, data fetching, and visualization remain independent and scalable.

## 2. Zustand Store Structure

I used Zustand for centralized state management of the dashboard.

The store maintains:

- **widgets** – List of widgets currently active on the dashboard
- **layout** – Grid layout configuration for each widget

Example structure:

widgets: [
{ id: "1", type: "token" },
{ id: "2", type: "latency" }
]

layout: [
{ i: "1", x: 0, y: 0, w: 4, h: 4 },
{ i: "2", x: 4, y: 0, w: 4, h: 4 }
]


Actions implemented in the store:

- `addWidget()` – adds a new widget to the dashboard
- `removeWidget()` – removes a widget
- `setLayout()` – updates layout after drag/resize

I used Zustand’s **persist middleware** so the layout and widgets are stored in `localStorage`.

This ensures that when the user refreshes the page, the dashboard layout is restored.

## 3. Grid Layout Integration

The dashboard grid is implemented using **react-grid-layout**.

This library provides:

- Drag and drop widgets
- Resizable widgets
- Responsive grid positioning

The layout state from Zustand is passed into the `GridLayout` component.

Whenever the layout changes due to dragging or resizing, the `onLayoutChange` event updates the Zustand store.

This keeps the UI layout synchronized with the application state.

## 4. Widget Data Fetching

Each widget fetches its own data independently using **TanStack Query (React Query)**.

This provides:

- Automatic caching
- Loading state handling
- Error handling
- Background refetching capability

Each widget type calls a different API function from `mockApi.ts`.

Example:

- `fetchTokenUsage()` → Token Usage widget
- `fetchLatencyDistribution()` → Latency widget
- `fetchCostAnalysis()` → Cost widget

The mock API simulates real API calls using `setTimeout`.

## 5. Data Visualization

Charts are implemented using **Recharts**.

Each widget renders a different chart type:

- **Token Usage** → Line Chart
- **Latency Distribution** → Bar Chart
- **Cost Analysis** → Pie Chart

I used `ResponsiveContainer` to ensure charts automatically adapt to the widget size when resized.

## 6. Layout Persistence

To maintain dashboard state across sessions, I implemented persistence using:


zustand persist middleware


This stores the following in `localStorage`:

- Widget list
- Grid layout positions
- Widget sizes

When the application loads, Zustand automatically rehydrates the stored state.

## 7. Potential Performance Bottlenecks

Some possible performance concerns include:

### Multiple Widget Data Fetching

If many widgets are added, multiple API requests may run simultaneously.

This can be optimized using:

- React Query caching
- Stale time configuration

### Re-renders During Dragging

Frequent layout updates could trigger unnecessary re-renders.

This can be improved by:

- Memoizing widget components
- Using `React.memo`

### Large Data Sets

If real APIs return large datasets, chart rendering may become expensive.

Possible solutions include:

- Data aggregation
- Virtualized rendering
- Server-side filtering

## 8. Scalability Considerations

The current architecture supports easy expansion.

New widget types can be added by:

1. Creating a new API function
2. Adding a new widget type
3. Rendering a new chart in the widget component

This makes the dashboard easily extensible for additional monitoring metrics.