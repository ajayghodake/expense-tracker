import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <Box sx={{
        bgcolor: 'background.paper',
        border: '0.5px solid',
        borderColor: 'divider',
        borderRadius: 1,
        px: 1.5, py: 1
      }}>
        <Typography variant="body2" fontWeight={500}>{label}</Typography>
        <Typography variant="body2" color="primary.main">
          ₹{payload[0].value?.toLocaleString('en-IN')}
        </Typography>
      </Box>
    );
  }
  return null;
};

const MonthlyLineChart = ({ monthlyTrend }) => {

  const chartData = monthlyTrend?.map((item) => ({
    name: `${MONTHS[item._id.month - 1]} ${item._id.year}`,
    total: item.total,
  })) || [];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" mb={1.5}>Monthly trend</Typography>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                angle={-30}
                textAnchor="end"
                interval={0}
                height={50}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#7C3AED"
                strokeWidth={2.5}
                dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body2" color="text.secondary">
              No data yet
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyLineChart;