import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lato-Regular, Lato-Bold",
  },
  palette: {
    primary: {
      main: "#7a488e"
    },
    secondary: {
      main: "#757575"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        outlined: {
          boxShadow: "0 0 0 1px inset",
        }
      }
    }
  }

});


export default theme;