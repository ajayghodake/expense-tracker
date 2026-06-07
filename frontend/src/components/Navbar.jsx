import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  AppBar, Toolbar, Typography, IconButton, Button, Box,
  Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, useMediaQuery, useTheme, Divider,
} from "@mui/material";
import {
  DarkMode, LightMode, Dashboard, List as ListIcon,
  Add, Menu as MenuIcon, Close, AccountBalanceWallet, Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/", icon: <Dashboard /> },
  { label: "Expenses", path: "/expenses", icon: <ListIcon /> },
  { label: "Add Expense", path: "/add", icon: <Add /> },
];

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>

          {/* Logo */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <AccountBalanceWallet sx={{ color: "primary.main", fontSize: 26 }} />
            <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "primary.main" }}>
              ExpenseTracker
            </Typography>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  startIcon={item.icon}
                  onClick={() => handleNavigate(item.path)}
                  variant={location.pathname === item.path ? "contained" : "text"}
                  color="primary"
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    borderRadius: 1,
                    textTransform: 'none',
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ ml: 1 }}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
              <Button
                color="error"
                variant="outlined"
                size="small"
                startIcon={<Logout sx={{ fontSize: 16 }} />}
                onClick={logout}
                sx={{
                  ml: 1,
                  fontSize: "13px",
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Logout
              </Button>
            </Box>
          )}

          {/* Mobile Nav */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconButton onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, backgroundColor: "background.paper" } }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "primary.main" }}>
            Menu
          </Typography>
          <IconButton size="small" onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ px: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                selected={location.pathname === item.path}
                sx={{ borderRadius: 2, my: 0.5 }}
              >
                <ListItemIcon sx={{
                  color: location.pathname === item.path ? "primary.main" : "text.secondary",
                  minWidth: 36,
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: '14px', fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 1 }} />

          <ListItem disablePadding>
            <ListItemButton
              onClick={logout}
              sx={{ borderRadius: 2, my: 0.5, color: "error.main" }}
            >
              <ListItemIcon sx={{ color: "error.main", minWidth: 36 }}>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: '14px', fontWeight: 600, color: 'error.main' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;