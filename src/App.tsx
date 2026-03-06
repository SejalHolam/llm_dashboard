import { useDashboardStore } from "./store/useDashboardStore";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Widget from "./components/Widget";

function App() {
  const { widgets, layout, addWidget, removeWidget, setLayout } = useDashboardStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">LLM Dashboard</h1>

      {/* Add Widget Buttons */}
      <div className="mb-4 space-x-2">
        <button
          onClick={() => addWidget("token")}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Token Widget
        </button>
        <button
          onClick={() => addWidget("latency")}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Add Latency Widget
        </button>
        <button
          onClick={() => addWidget("cost")}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          Add Cost Widget
        </button>
      </div>

      {/* Grid Layout */}
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={window.innerWidth - 50} // responsive
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {widgets.map((widget) => {
          const w = layout.find((l) => l.i === widget.id)?.w || 4;
          const h = layout.find((l) => l.i === widget.id)?.h || 4;
          return (
            <div key={widget.id} style={{ height: `${h * 30}px` }}>
              <Widget id={widget.id} type={widget.type} onRemove={removeWidget} />
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
}

export default App;