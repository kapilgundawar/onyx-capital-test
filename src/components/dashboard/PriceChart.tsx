import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

interface PriceData {
  time: number;
  price: number;
}

const PriceChart: React.FC<{ pair: string }> = ({ pair }) => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === "trade") {
        const newPrice: PriceData = {
          time: data.T,
          price: parseFloat(data.p),
        };

        setPriceData((prevData) => {
          const updatedData = [...prevData, newPrice];
          return updatedData.slice(-10); // Keep the latest 10 price points
        });
      }
    };

    return () => {
      ws.close();
    };
  }, [pair]);

  const chartData = {
    labels: priceData.map((d) => new Date(d.time).toLocaleTimeString()),
    datasets: [
      {
        label: `${pair.toUpperCase()} Price`,
        data: priceData.map((d) => d.price),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };
  return (
    <div style={{ width: "100%", height: "240px" }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default PriceChart;
