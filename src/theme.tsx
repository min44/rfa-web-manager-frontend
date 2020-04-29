import { createMuiTheme } from "@material-ui/core/styles";

export const useTheme = () =>
  createMuiTheme({
    typography: {
      body1: {
        fontWeight: 400,
      },
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontWeightRegular: 300,
    },
    palette: {
      type: "dark",
      primary: {
        light: "#819ca9",
        main: "#546e7a",
        dark: "#29434e",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffffff",
        main: "#424242",
        dark: "#c7c7c7",
        contrastText: "#000",
      },
    },
  });
