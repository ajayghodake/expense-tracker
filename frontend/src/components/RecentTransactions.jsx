import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const COLORS = ['#7C3AED', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#EC4899', '#14B8A6', '#F97316'];

const RecentTransactions = ({ transactions }) => {
  return (
    <Card>
      <CardContent sx={{ p: 2 }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 700, color: 'text.primary', mb: 1.5 }}>
          Recent transactions
        </Typography>

        {transactions?.length > 0 ? (
          transactions.map((expense, index) => (
            <Box
              key={expense._id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 1.2,
                borderBottom: index < transactions.length - 1 ? '0.5px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Avatar sx={{
                width: 36, height: 36,
                bgcolor: COLORS[index % COLORS.length] + '20',
                color: COLORS[index % COLORS.length],
                fontSize: 13, fontWeight: 700,
                borderRadius: 2,
              }}>
                {expense.category[0]}
              </Avatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700, color: 'text.primary' }} noWrap>
                  {expense.title}
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'text.secondary' }}>
                  {expense.category} · {new Date(expense.date).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </Typography>
              </Box>

              <Typography sx={{ fontSize: { lg: '16px', xs: '14px', sm: '14px' }, fontWeight: 700, color: 'primary.main' }}>
                ₹{expense.amount.toLocaleString('en-IN')}
              </Typography>

            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'text.secondary' }}>
              No transactions yet!
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;