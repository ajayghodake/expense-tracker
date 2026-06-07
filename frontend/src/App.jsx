import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { ExpenseProvider } from './context/ExpenseContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => darkMode ? darkTheme : lightTheme, [darkMode]);
  const { token } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {token && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={<ProtectedRoute><ExpenseProvider><Dashboard /></ExpenseProvider></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><ExpenseProvider><Expenses /></ExpenseProvider></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><ExpenseProvider><AddExpense /></ExpenseProvider></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><ExpenseProvider><AddExpense /></ExpenseProvider></ProtectedRoute>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;