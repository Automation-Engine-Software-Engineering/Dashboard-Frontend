import {
  Bar,
  BarChart as BarRechart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

const BarChart = () => {
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
      <BarRechart data={chartData} margin={{ left: -30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="uv" fill="#0099A5" />
      </BarRechart>
    </ResponsiveContainer>
  );
};

export default BarChart;
