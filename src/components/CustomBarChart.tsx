import { Box, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  data: any;
  title: string;
}

const CustomBarCharts = ({ data, title }: ChartProps) => {
  return (
    <>
      <Box sx={{ mb: "10px" }}>
        <Typography
          variant="h3"
          sx={{
            color: (theme) => theme.palette.primary.main,
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          {title}
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="source"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              `${value}`,
              name?.toString().split("_")?.join(" "),
            ]}
            itemStyle={{ textTransform: "capitalize" }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="source_count"
            fill="#8884d8"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomBarCharts;
