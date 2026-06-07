import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Container, Card, CardContent, Typography, TextField,
  Button, MenuItem, Grid, Box, CircularProgress
} from '@mui/material';
import { useExpense } from '../context/ExpenseContext';
import * as api from '../services/expenses';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Education', 'Bills', 'Other'];

const AddExpense = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
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
    if (isEdit) {
      api.getExpenseById(id).then((res) => {
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
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await editExpense(id, data);
      } else {
        await addExpense(data);
      }
      navigate('/expenses');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {isEdit ? '✏️ Edit Expense' : '➕ Add Expense'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

              {/* Title */}
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: 'Title is required', minLength: { value: 2, message: 'Min 2 characters' } }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </Grid>

              {/* Amount */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: 'Amount is required',
                    min: { value: 1, message: 'Amount must be greater than 0' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Amount (₹)"
                      type="number"
                      fullWidth
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                    />
                  )}
                />
              </Grid>

              {/* Date */}
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
                      multiline
                      rows={3}
                    />
                  )}
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/expenses')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                  >
                    {isEdit ? 'Update Expense' : 'Add Expense'}
                  </Button>
                </Box>
              </Grid>

            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddExpense;