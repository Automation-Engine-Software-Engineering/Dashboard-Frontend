import { ResponsiveContainer, PieChart as PieRechart, Pie } from "recharts";

const PieChart = () => {
  const chartData = [
    {
      name: "Label 1",
      value: 200
    },
    {
      name: "Label 2",
      value: 300
    },
    {
      name: "Label 3",
      value: 200
    }
  ];

  return (
    <ResponsiveContainer height={250}>
      <PieRechart margin={{ left: -30 }}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          startAngle={0}
          endAngle={180}
          fill="#0099A5"
          dataKey="value"
          label
        />
      </PieRechart>
    </ResponsiveContainer>
  );
};
export default PieChart;
