import { useForm, Controller } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Card, CardContent, TextField,
  Button, Typography, CircularProgress, Alert
} from '@mui/material';
import { AccountBalanceWallet } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await register(data);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      px: 2,
    }}>
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent sx={{ p: 4 }}>

          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <AccountBalanceWallet sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h5" fontWeight="bold" color="primary.main">
              ExpenseTracker
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Create your account
            </Typography>
          </Box>

          {/* Error */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>

            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Min 6 characters' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: 'Please confirm password',
                validate: (value) => value === password || 'Passwords do not match'
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} /> : null}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

          </Box>

          {/* Login Link */}
          <Typography variant="body2" textAlign="center" mt={2} color="text.secondary">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#7C3AED', fontWeight: 600, textDecoration: 'none' }}>
              Sign In
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;