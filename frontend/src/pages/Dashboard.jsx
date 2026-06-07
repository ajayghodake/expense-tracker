import { useEffect } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useExpense } from "../context/ExpenseContext";
import StatCards from "../components/StatCards";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyLineChart from "../components/MonthlyLineChart";
import RecentTransactions from "../components/RecentTransactions";
import AddExpenseButton from "../components/AddExpenseButton";

const Dashboard = () => {
  const { dashboardStats, fetchDashboardStats, loading } = useExpense();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const categoryData =
    dashboardStats?.categoryWise?.map((item) => ({
      name: item._id,
      value: item.total,
    })) || [];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress size={52} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 4, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Typography
        sx={{ fontSize: "24px", fontWeight: 700, color: "text.primary", mb: 2 }}
      >
        Dashboard
      </Typography>

      {/* Stat Cards */}
      <StatCards dashboardStats={dashboardStats} />

      {/* Charts Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 2,
          mt: 3,
        }}
      >
        <Box sx={{ flex: { md: 5 }, minWidth: 0 }}>
          <CategoryPieChart categoryData={categoryData} />
        </Box>
        <Box sx={{ flex: { md: 7 }, minWidth: 0 }}>
          <MonthlyLineChart monthlyTrend={dashboardStats?.monthlyTrend} />
        </Box>
      </Box>

      {/* Recent Transactions */}
      <RecentTransactions transactions={dashboardStats?.recentTransactions} />

      {/* Floating Add Button */}
      <AddExpenseButton onSuccess={fetchDashboardStats} />
    </Container>
  );
};

export default Dashboard;
