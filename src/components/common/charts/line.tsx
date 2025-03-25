import {
  Line,
  LineChart as LineRechart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

const LineChart = () => {
  const chartData = [
    {
      name: "label 1",
      uv: 20
    },
    {
      name: "label 2",
      uv: 30
    },
    {
      name: "label 3",
      uv: 50
    },
    {
      name: "label 4",
      uv: 40
    },
    {
      name: "label 5",
      uv: 10
    }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineRechart data={chartData} margin={{ left: -30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="uv" stroke="#0099A5" />
      </LineRechart>
    </ResponsiveContainer>
  );
};

export default LineChart;
