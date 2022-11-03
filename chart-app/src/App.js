import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { socket } from "./lib/socket";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  // 1. listen for a cpu event and update the state
  useEffect(() => {
    socket.on("cpu", (cpuPercent) => {
      setData((currentData) => [...currentData, cpuPercent]);
    });
  }, []);

  return (
    <div>
      <h1>Real Time CPU Usage</h1>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  );
}

export default App;
