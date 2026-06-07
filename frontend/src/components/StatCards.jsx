import { Card, CardContent, Box, Typography } from "@mui/material";
import {
  TrendingUp,
  CalendarMonth,
  Receipt,
  PieChart as PieIcon,
} from "@mui/icons-material";

const StatCard = ({ title, value, icon, bgColor, sub }) => (
  <Card>
    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 1, sm: 2 },
      }}>

        {/* Icon */}
        <Box sx={{
          width: { xs: 32, sm: 44 },
          height: { xs: 32, sm: 44 },
          borderRadius: 2,
          bgcolor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </Box>

        {/* Text */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '11px', sm: '13px' },
              fontWeight: 500,
              color: 'text.secondary',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '14px', sm: '18px' },
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1.3,
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '10px', sm: '11px' },
              color: 'text.secondary',
              mt: 0.3,
            }}
          >
            {sub}
          </Typography>
        </Box>

      </Box>
    </CardContent>
  </Card>
);

const StatCards = ({ dashboardStats }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)", 
          sm: "repeat(4, 1fr)", 
        },
        gap: 2,
        mb: 2,
      }}
    >
      <StatCard
        title="Total expenses"
        value={`₹${(dashboardStats?.totalExpenses || 0).toLocaleString("en-IN")}`}
        icon={<TrendingUp sx={{ fontSize: 18, color: "#7C3AED" }} />}
        bgColor="#EEEDFE"
        sub="All time"
      />
      <StatCard
        title="This month"
        value={`₹${(dashboardStats?.monthlyExpenses || 0).toLocaleString("en-IN")}`}
        icon={<CalendarMonth sx={{ fontSize: 18, color: "#D97706" }} />}
        bgColor="#FEF3C7"
        sub={new Date().toLocaleString("en-IN", {
          month: "long",
          year: "numeric",
        })}
      />
      <StatCard
        title="Transactions"
        // value={dashboardStats?.recentTransactions?.length || 0}
        value={dashboardStats?.totalCount || 0}
        icon={<Receipt sx={{ fontSize: 18, color: "#059669" }} />}
        bgColor="#D1FAE5"
        sub="Total entries"
      />
      <StatCard
        title="Top category"
        value={dashboardStats?.topCategory?._id || "—"}
        icon={<PieIcon sx={{ fontSize: 18, color: "#DB2777" }} />}
        bgColor="#FCE7F3"
        sub={
          dashboardStats?.topCategory
            ? `₹${dashboardStats.topCategory.total?.toLocaleString("en-IN")} spent`
            : "No data yet"
        }
      />
    </Box>
  );
};

export default StatCards;
