import { create } from "zustand"
import { persist } from "zustand/middleware"

export type WidgetType = "token" | "latency" | "cost"

export interface Widget {
  id: string
  type: WidgetType
}

interface DashboardState {
  widgets: Widget[]
  layout: any[]
  addWidget: (type: WidgetType) => void
  removeWidget: (id: string) => void
  setLayout: (layout: any[]) => void
}

export const useDashboardStore = create<DashboardState>()(persist((set) => ({
  widgets: [
    { id: "1", type: "token" },
    { id: "2", type: "latency" },
  ],

  layout: [
    { i: "1", x: 0, y: 0, w: 4, h: 4 },
    { i: "2", x: 4, y: 0, w: 4, h: 4 },
  ],

  addWidget: (type) =>
    set((state) => {
      const id = Date.now().toString()
      return {
        widgets: [...state.widgets, { id, type }],
        layout: [
          ...state.layout,
          { i: id, x: 0, y: Infinity, w: 4, h: 4 },
        ],
      }
    }),

  removeWidget: (id) =>
    set((state) => ({
      widgets: state.widgets.filter((w) => w.id !== id),
      layout: state.layout.filter((l) => l.i !== id),
    })),

  setLayout: (layout) => set({ layout }),
}),{
      name: "dashboard-storage", // localStorage key
    }
  )
)