import { useState, useEffect } from 'react';
import {
  Fab, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, MenuItem,
  Grid, Box, Typography, CircularProgress, IconButton
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useExpense } from '../context/ExpenseContext';
import * as api from '../services/expenses';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Education', 'Bills', 'Other'];

const AddExpenseButton = ({ expenseId = null, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(expenseId);
  const { addExpense, editExpense } = useExpense();

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
    }
  });

  useEffect(() => {
    if (isEdit && open) {
      api.getExpenseById(expenseId).then((res) => {
        const e = res.data.data;
        reset({
          title: e.title,
          amount: e.amount,
          category: e.category,
          date: new Date(e.date).toISOString().split('T')[0],
          description: e.description,
        });
      });
    }
    if (!open) {
      reset({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
      });
    }
  }, [open, expenseId, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await editExpense(expenseId, data);
      } else {
        await addExpense(data);
      }
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* FAB Button - only show for Add */}
      {!isEdit && (
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1000,
          }}
        >
          <Add />
        </Fab>
      )}

      {/* Edit Button - only show for Edit */}
      {isEdit && (
        <IconButton
          size="small"
          onClick={() => setOpen(true)}
          sx={{ color: 'primary.main', p: 0.5 }}
        >
          <Add fontSize="small" />
        </IconButton>
      )}

      {/* Dialog / Popup Form */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, m: { xs: 1, sm: 2 } } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              {isEdit ? '✏️ Edit Expense' : '➕ Add Expense'}
            </Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Grid container spacing={2} sx={{ mt: 0 }}>

            {/* Title */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: 'Title is required',
                  minLength: { value: 2, message: 'Min 2 characters' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    size="small"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Amount + Date */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: 'Amount is required',
                  min: { value: 1, message: 'Must be greater than 0' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount (₹)"
                    type="number"
                    fullWidth
                    size="small"
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="date"
                control={control}
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date"
                    type="date"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12}>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Category"
                    select
                    fullWidth
                    size="small"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  >
                    {CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description (optional)"
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                  />
                )}
              />
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            size="small"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            size="small"
            startIcon={isSubmitting ? <CircularProgress size={16} /> : null}
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Add Expense'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddExpenseButton;