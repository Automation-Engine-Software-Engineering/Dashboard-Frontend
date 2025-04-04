import {
  Bar,
  BarChart as BarRechart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

const BarChart = ({
  values,
  color
}: {
  values: { value: number; label: string }[];
  color: string;
}) => {
  return (
    <ResponsiveContainer width="100%" style={{ direction: "ltr" }}>
      <BarRechart data={values} margin={{ left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Bar dataKey="value" fill={color} />
      </BarRechart>
    </ResponsiveContainer>
  );
};

export default BarChart;
