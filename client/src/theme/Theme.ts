import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      // Main color
      main: "#08c",
      // White
      contrastText: "#eee",
    },
    background: {
      // Black
      default: "#333",
    },
    text: {
      // Black
      primary: "#333",
    },
  },
});

export default theme;
