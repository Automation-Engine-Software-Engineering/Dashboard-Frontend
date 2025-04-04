import {
  Line,
  LineChart as LineRechart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

const LineChart = ({
  values,
  color
}: {
  values: { value: number; label: string }[];
  color: string;
}) => {
  return (
    <ResponsiveContainer width="100%" style={{ direction: "ltr" }}>
      <LineRechart data={values} margin={{ left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Line dataKey="value" stroke={color} />
      </LineRechart>
    </ResponsiveContainer>
  );
};

export default LineChart;
