import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#7C3AED', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#EC4899', '#14B8A6', '#F97316'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <Box sx={{
        bgcolor: 'background.paper',
        border: '0.5px solid',
        borderColor: 'divider',
        borderRadius: 1,
        px: 1.5, py: 1
      }}>
        
        <Typography variant="body2" fontWeight={500}>{payload[0].name}</Typography>
        <Typography variant="body2" color="primary.main">
          ₹{payload[0].value?.toLocaleString('en-IN')}
        </Typography>
      </Box>
    );
  }
  return null;
};

const CategoryPieChart = ({ categoryData }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" mb={1.5}>By category</Typography>

        {/* Legend */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
          {categoryData.map((item, index) => (
            <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{
                width: 8, height: 8,
                borderRadius: '2px',
                bgcolor: COLORS[index % COLORS.length]
              }} />
              <Typography variant="body2" color="text.secondary" fontSize={11}>
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
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

export default CategoryPieChart;