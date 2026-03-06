import { useQuery } from "@tanstack/react-query";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";

import { fetchTokenUsage, fetchLatencyDistribution, fetchCostAnalysis } from "../services/mockApi";
import type { TokenUsage, LatencyDistribution, CostAnalysis } from "../services/mockApi";

interface WidgetProps {
  id: string;
  type: "token" | "latency" | "cost";
  onRemove: (id: string) => void;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Widget = ({ id, type, onRemove }: WidgetProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["widgetData", id],
    queryFn: () => {
      if (type === "token") return fetchTokenUsage();
      if (type === "latency") return fetchLatencyDistribution();
      return fetchCostAnalysis();
    },
  });

  if (isLoading) return <div style={{ padding: "10px" }}>Loading data...</div>;
  if (isError) return <div style={{ padding: "10px" }}>Error loading data</div>;

  return (
    <div style={{
      border: "1px solid black",
      background: "#f5f5f5",
      height: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ padding: "10px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{type.toUpperCase()} Widget</h3>
          <button onClick={() => onRemove(id)}>Remove</button>
        </div>
        <div style={{ flex: 1, width: "100%", height: "200px", marginTop: "10px" }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === "token" && (
              <LineChart data={data as TokenUsage[]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tokens" stroke="#8884d8" />
              </LineChart>
            )}
            {type === "latency" && (
              <BarChart data={data as LatencyDistribution[]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="latency_ms" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="request_count" fill="#82ca9d" />
              </BarChart>
            )}
            {type === "cost" && (
              <PieChart>
                <Pie
                  data={data as CostAnalysis[]}
                  dataKey="cost"
                  nameKey="model_name"
                  outerRadius={80}
                  label
                >
                  {(data as CostAnalysis[]).map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Widget;