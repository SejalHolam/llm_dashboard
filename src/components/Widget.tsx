import { useQuery } from "@tanstack/react-query";

interface WidgetProps {
  id: string;
  type: string;
  onRemove: (id: string) => void;
}

const fetchData = async (type: string) => {
  let url = "";

  if (type === "token") {
    url = "https://jsonplaceholder.typicode.com/posts";
  } else if (type === "latency") {
    url = "https://jsonplaceholder.typicode.com/comments";
  } else {
    url = "https://jsonplaceholder.typicode.com/users";
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

const Widget = ({ id, type, onRemove }: WidgetProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["widgetData", type],
    queryFn: () => fetchData(type),
  });

  if (isLoading) {
    return (
      <div style={{ padding: "10px" }}>
        <p>Loading data...</p>
      </div>
    );
  }

  if (isError) return <div>Error loading data</div>;
  return (
   <div
  style={{
    border: "1px solid black",
    background: "#f5f5f5",
    height: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }}
>
      <div style={{ padding: "10px" }}>
        <h3>{type.toUpperCase()} Widget</h3>
        {type === "token" && <p>Total Posts: {data?.length}</p>}

        {type === "latency" && <p>Total Comments: {data?.length}</p>}

        {type === "cost" && <p>Total Users: {data?.length}</p>}
        <button onClick={() => onRemove(id)}>Remove</button>
      </div>
    </div>
  );
};

export default Widget;
