import { Box, Typography } from "@mui/material";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface ChartProps {
  data: any;
  title: string;
}

const CustomPieCharts = ({ data, title }: ChartProps) => {
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

      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="status_count"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomPieCharts;
