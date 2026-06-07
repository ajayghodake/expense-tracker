import {
  Card, CardContent, Box, Typography,
  IconButton, Chip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CATEGORY_COLORS = {
  Food: { bg: '#EEEDFE', color: '#7C3AED' },
  Transport: { bg: '#FEF3C7', color: '#D97706' },
  Shopping: { bg: '#D1FAE5', color: '#059669' },
  Entertainment: { bg: '#FCE7F3', color: '#DB2777' },
  Health: { bg: '#DBEAFE', color: '#2563EB' },
  Education: { bg: '#FEE2E2', color: '#DC2626' },
  Bills: { bg: '#F3F4F6', color: '#374151' },
  Other: { bg: '#FEF9C3', color: '#CA8A04' },
};

const ExpenseCard = ({ expense, onDelete }) => {
  const navigate = useNavigate();
  const categoryStyle = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other;

  return (
    <Card sx={{
      height: '100%',
      transition: 'transform 0.15s, box-shadow 0.15s',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }
    }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>

        {/* Top Row - Category chip + Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip
            label={expense.category}
            size="small"
            sx={{
              bgcolor: categoryStyle.bg,
              color: categoryStyle.color,
              fontWeight: 600,
              fontSize: 11,
              height: 24,
            }}
          />
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => navigate(`/edit/${expense._id}`)}
              sx={{ color: 'primary.main', p: 0.5 }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(expense._id)}
              sx={{ color: 'error.main', p: 0.5 }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="body1"
          fontWeight={600}
          noWrap
          mb={0.5}
        >
          {expense.title}
        </Typography>

        {/* Amount */}
        <Typography
          variant="h6"
          fontWeight={700}
          color="primary.main"
          mb={0.5}
        >
          ₹{expense.amount.toLocaleString('en-IN')}
        </Typography>

        {/* Date + Description */}
        <Typography variant="body2" color="text.secondary" fontSize={11}>
          {new Date(expense.date).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
          })}
        </Typography>

        {expense.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={11}
            noWrap
            mt={0.5}
          >
            {expense.description}
          </Typography>
        )}

      </CardContent>
    </Card>
  );
};

export default ExpenseCard;