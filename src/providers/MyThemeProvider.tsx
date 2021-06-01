import { FC } from "react";
import { ThemeProvider } from "styled-components";

const useTheme: MyThemeProps = {
  palette: {
    paper: "#1C1C1C",
    primary: "#0D2636",
    contrastText: "#fff",
    secondaryText: "rgba(255, 255, 255, 0.7)"
  },
};

const MyThemeProvider: FC = ({ children }) => {
  return <ThemeProvider theme={useTheme}>{children}</ThemeProvider>;
};

export interface MyThemeProps {
  palette: {
    paper: string;
    primary: string;
    contrastText: string;
    secondaryText: string;
  };
}

export default MyThemeProvider;
