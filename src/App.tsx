import { useDashboardStore } from "./store/useDashboardStore"
import GridLayout from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import Widget from "./components/Widget"

function App() {
  const { widgets, layout, addWidget, removeWidget, setLayout } =
    useDashboardStore()

  return (
    <div>
      <h1>LLM Dashboard</h1>

      <button onClick={() => addWidget("cost")}>
        Add Cost Widget
      </button>

      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <Widget
              id={widget.id}
              type={widget.type}
              onRemove={removeWidget}
            />
          </div>
        ))}
      </GridLayout>
    </div>
  )
}

export default App