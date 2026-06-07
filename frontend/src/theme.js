
// // import { createTheme } from '@mui/material/styles';

// // export const lightTheme = createTheme({
// //     palette: {
// //         mode: 'light',
// //         primary: {main: '#6C63FF'},
// //         secondary: { main: '#FF6584' },
// //         background: { default: '#F5F6FA', paper: '#FFFFFF' },
// //     }, 
// //     typography: {
// //         fontFamily: 'Roboto, sans-serif',
// //     },
// //     shape: { borderRadius: 12 },
// // });

// // export const darkTheme = createTheme({
// //   palette: {
// //     mode: 'dark',
// //     primary: { main: '#6C63FF' },
// //     secondary: { main: '#FF6584' },
// //     background: { default: '#121212', paper: '#1E1E1E' },
// //   },
// //   typography: {
// //     fontFamily: 'Roboto, sans-serif',
// //   },
// //   shape: { borderRadius: 12 },
// // });

// import { createTheme } from '@mui/material/styles';

// const commonSettings = {
//   typography: {
//     fontFamily: '"Inter", "Roboto", sans-serif',
//     h4: { fontWeight: 700 },
//     h5: { fontWeight: 700 },
//     h6: { fontWeight: 600 },
//   },
//   shape: { borderRadius: 16 },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           fontWeight: 600,
//           borderRadius: 12,
//           padding: '8px 20px',
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//           borderRadius: 16,
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: { borderRadius: 12 },
//       },
//     },
//   },
// };

// export const lightTheme = createTheme({
//   ...commonSettings,
//   palette: {
//     mode: 'light',
//     primary: { main: '#7C3AED', light: '#EDE9FE', dark: '#5B21B6' },
//     secondary: { main: '#F59E0B' },
//     background: { default: '#F8F7FF', paper: '#FFFFFF' },
//     success: { main: '#10B981' },
//     error: { main: '#EF4444' },
//     text: { primary: '#1F2937', secondary: '#6B7280' },
//   },
// });

// export const darkTheme = createTheme({
//   ...commonSettings,
//   palette: {
//     mode: 'dark',
//     primary: { main: '#A78BFA', light: '#2D1B69', dark: '#7C3AED' },
//     secondary: { main: '#F59E0B' },
//     background: { default: '#0F0F1A', paper: '#1A1A2E' },
//     success: { main: '#10B981' },
//     error: { main: '#EF4444' },
//     text: { primary: '#F9FAFB', secondary: '#9CA3AF' },
//   },
// });


import { createTheme } from '@mui/material/styles';

const commonSettings = {
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: { fontWeight: 700, fontSize: '1.6rem' },
    h5: { fontWeight: 700, fontSize: '1.3rem' },
    h6: { fontWeight: 600, fontSize: '1.1rem' },
    body1: { fontSize: '0.9rem' },
    body2: { fontSize: '0.8rem' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '6px 16px',
          fontSize: '0.85rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          borderRadius: 10,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontSize: '0.75rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            fontSize: '0.9rem',
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: { main: '#7C3AED', light: '#EDE9FE', dark: '#5B21B6' },
    secondary: { main: '#F59E0B' },
    background: { default: '#F4F5F7', paper: '#FFFFFF' },
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    text: { primary: '#1F2937', secondary: '#6B7280' },
  },
});

export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: { main: '#A78BFA', light: '#2D1B69', dark: '#7C3AED' },
    secondary: { main: '#F59E0B' },
    background: { default: '#0F0F1A', paper: '#1A1A2E' },
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    text: { primary: '#F9FAFB', secondary: '#9CA3AF' },
  },
});