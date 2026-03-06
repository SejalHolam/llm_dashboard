# LLM Monitoring Dashboard

A dynamic dashboard built with React + TypeScript to monitor LLM metrics. Users can add, remove, resize, and rearrange widgets on a grid. Each widget fetches mock data and displays it in charts. The dashboard layout persists across page reloads.

## Features

- Drag, resize, and rearrange widgets using react-grid-layout
- Widgets:
  Token Usage (Line Chart)
  Latency Distribution (Bar Chart)
  Cost Analysis (Pie Chart)
- Independent data fetching per widget using React Query
- Persistent layout using Zustand + localStorage
- Responsive and styled with Tailwind CSS

## Installation

1. Clone the repository:

git clone <repo-url>
cd llm-dashboard

2. Install dependencies:

npm install

3. Start the development server:

npm run dev

4. Open your browser at http://localhost:5173 (Vite default)

Project Structure
src/
├── main.tsx            # Entry point
├── App.tsx             # Dashboard layout + Add Widget buttons
├── index.css           # Tailwind/global styles
├── store/
│   └── useDashboardStore.ts
├── components/
│   └── Widget.tsx
└── services/
    └── mockApi.ts      # Mock API data for charts

- store/useDashboardStore.ts → Manages widgets and grid layout state
- components/Widget.tsx → Individual widget component with charts
- services/mockApi.ts → Mock async data for widgets

## Usage

- Click Add Widget buttons to add a new Token, Latency, or Cost widget
- Drag and resize widgets freely
-Remove widgets using the Remove button
-Layout and widget configuration persist across reloads

## Tech Stack

-React + TypeScript
-Zustand → State management
-React Query → Server/mocked data fetching
-React Grid Layout → Grid and drag/resize system

Recharts → Charts

Tailwind CSS → Styling

Vite → Project setup

This README gives clear instructions for anyone to install, run, and use the dashboard, fulfilling the assignment requirement.
