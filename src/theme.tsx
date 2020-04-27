import { createMuiTheme } from '@material-ui/core/styles';

export const useTheme = () => createMuiTheme({
    typography: {
      fontWeightRegular: 300,
      fontFamily: ["-apple-system", "BlinkMacSystemFont", "Roboto", '"Helvetica Neue"', "Arial"].join(","),
      button: {
        fontWeight: 300
      },
      h6: {
        fontWeight: 300,
      },
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
        main: "#fafafa",
        dark: "#c7c7c7",
        contrastText: "#000",
      },
    },
  });