// import { createMuiTheme } from '@material-ui/core/styles';
import { createTheme } from '@mui/material/styles';

// import { orange, red } from '@material-ui/core/colors';
// import scss from './_variables.module.scss';

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: 'translate(14px, 8px) scale(1)',
          '&.Mui-focused': {
            color: '#3f51b5',
            // transform: 'translate(14px, -8px) scale(0.75)',
          },
        },
        shrink: {
          transform: 'translate(14px, -8px) scale(0.75)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #3f51b5',
          },
        },
        input: {
          padding: '6.5px 14px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#3f51b5',
          '&:hover': {
            backgroundColor: '#303f9f',
          },
        },
        outlined: {
          borderColor: '#3f51b5',
          color: '#3f51b5',
        },
      },
    },
  },
});
// const theme = createMuiTheme({
//   components: {
//     MuiTextField: {
//       defaultProps: {
//         variant: 'outlined',
//       },
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         'Mui-focused': {
//           notchedOutline: {
//             border: '10px solid green',
//           },
//         },
//         root: {
//           border: '10px solid green',
//           '& .Mui-focused': {
//             '& .MuiOutlinedInput-notchedOutline': {
//               borderWidth: '10px',
//             },
//           },
//         },
//         notchedOutline: {
//           borderColor: 'green',
//         },
//       },
//     },
//   },
//   overrides: {
//     MuiButtonBase: {
//       root: {
//         // backgroundColor: 'rgba(255, 255, 255, .3)'
//       },
//     },
//     MuiSelect: {
//       select: {
//         '&:focus': {
//           backgroundColor: 'transparent',
//         },
//       },
//     },
//     MuiOutlinedInput: {
//       root: {
//         '&.Mui-focused': {
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderWidth: '1px',
//           },
//         },
//       },
//       input: {
//         padding: '8.5px 14px',
//       },
//       multiline: {
//         padding: '8.5px 14px',
//       },
//     },
//     MuiInputLabel: {
//       outlined: {
//         transform: 'translate(14px, 11px) scale(1)',
//       },
//     },
//     MuiDrawer: {
//       paper: {
//         backgroundColor: scss.BACKGROUND_PRIMARY_LIGHT,
//       },
//     },
//     MuiAppBar: {
//       colorPrimary: {},
//     },
//     MuiTabs: {
//       indicator: {
//         height: '4px',
//       },
//     },
//   },
//   // use the following style directly
//   // by passing them through makeStyles
//   // colorPrimary: {
//   //   color: 'red'
//   // },
//   // status: {
//   //   danger: '#ffffff'
//   // }
// });

export default theme;
