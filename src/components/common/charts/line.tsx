import {
  Line,
  LineChart as LineRechart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

const LineChart = ({
  values
}: {
  values: { value: number; label: string }[];
}) => {
  return (
    <ResponsiveContainer width="100%" style={{ direction: "ltr" }}>
      <LineRechart data={values} margin={{ left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Line dataKey="value" stroke="#0099A5" />
      </LineRechart>
    </ResponsiveContainer>
  );
};

export default LineChart;
