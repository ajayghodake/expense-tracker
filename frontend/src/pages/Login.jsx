import { useForm, Controller } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Card, CardContent, TextField,
  Button, Typography, CircularProgress, Alert
} from '@mui/material';
import { AccountBalanceWallet } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
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
              Sign in to your account
            </Typography>
          </Box>

          {/* Error */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>

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
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

          </Box>

          {/* Register Link */}
          <Typography variant="body2" textAlign="center" mt={2} color="text.secondary">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#7C3AED', fontWeight: 600, textDecoration: 'none' }}>
              Register
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;