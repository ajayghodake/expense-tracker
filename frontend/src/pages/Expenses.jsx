import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  IconButton,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import { useExpense } from "../context/ExpenseContext";
import AddExpenseButton from "../components/AddExpenseButton";

const CATEGORIES = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Bills",
  "Other",
];

const CATEGORY_COLORS = {
  Food: { bg: "#EEEDFE", color: "#7C3AED" },
  Transport: { bg: "#FEF3C7", color: "#D97706" },
  Shopping: { bg: "#D1FAE5", color: "#059669" },
  Entertainment: { bg: "#FCE7F3", color: "#DB2777" },
  Health: { bg: "#DBEAFE", color: "#2563EB" },
  Education: { bg: "#FEE2E2", color: "#DC2626" },
  Bills: { bg: "#F3F4F6", color: "#374151" },
  Other: { bg: "#FEF9C3", color: "#CA8A04" },
};

const Expenses = () => {
  const { expenses, fetchExpenses, removeExpense, loading } = useExpense();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category !== "All") params.category = category;
    fetchExpenses(params);
  }, [search, category, fetchExpenses]);

  const handleDelete = async () => {
    await removeExpense(deleteId);
    setDeleteId(null);
  };

  const categoryStyle = (cat) => CATEGORY_COLORS[cat] || CATEGORY_COLORS.Other;

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 4, px: { xs: 2, sm: 3 } }}>
      {/* Header */}

      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ fontSize: "22px", fontWeight: 700, color: "text.primary" }}
        >
          Expense History
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 400,
            color: "text.secondary",
            mt: 0.3,
          }}
        >
          Track and manage all your expenses
        </Typography>
      </Box>

      {/* Search + Filter */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <Search sx={{ mr: 1, color: "text.secondary", fontSize: 18 }} />
            ),
          }}
        />
        <TextField
          select
          size="small"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: { xs: "100%", sm: 180 } }}
        >
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress size={32} />
        </Box>
      )}

      {/* Empty State */}
      {!loading && expenses.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography sx={{ fontSize: "16px", color: "text.secondary", mb: 2 }}>
            No expenses found!
          </Typography>
        </Box>
      )}

      {/* Expenses Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {expenses.map((expense) => (
          <Card
            key={expense._id}
            sx={{
              transition: "transform 0.15s, box-shadow 0.15s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              {/* Top Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.3,
                    borderRadius: 1,
                    bgcolor: categoryStyle(expense.category).bg,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: categoryStyle(expense.category).color,
                    }}
                  >
                    {expense.category}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton
                    size="small"
                    sx={{ color: "primary.main", p: 0.5 }}
                    onClick={() => setEditId(expense._id)}
                  >
                    <Edit sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "error.main", p: 0.5 }}
                    onClick={() => setDeleteId(expense._id)}
                  >
                    <Delete sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 0.5,
                }}
                noWrap
              >
                {expense.title}
              </Typography>

              {/* Amount */}
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "primary.main",
                  mb: 0.5,
                }}
              >
                ₹{expense.amount.toLocaleString("en-IN")}
              </Typography>

              {/* Date */}
              <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                {new Date(expense.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>

              {/* Description */}
              {expense.description && (
                <Typography
                  sx={{ fontSize: "11px", color: "text.secondary", mt: 0.5 }}
                  noWrap
                >
                  {expense.description}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Floating Add Button */}
      <AddExpenseButton onSuccess={() => fetchExpenses({})} />

      {/* Edit Dialog — NEW, was not here before */}
      {editId && (
        <AddExpenseButton
          expenseId={editId}
          onSuccess={() => {
            fetchExpenses({});
            setEditId(null);
          }}
        />
      )}

      {/* Delete Dialog */}
      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>
          <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
            Delete Expense?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
            Are you sure? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Expenses;
