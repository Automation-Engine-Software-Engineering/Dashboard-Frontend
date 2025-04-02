import { ResponsiveContainer, PieChart as PieRechart, Pie } from "recharts";

const PieChart = ({
  values
}: {
  values: { value: number; label: string }[];
}) => {
  return (
    <ResponsiveContainer width="100%">
      <PieRechart margin={{ left: 0 }}>
        <Pie
          data={values}
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
