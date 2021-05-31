import { FC } from "react";
import { ThemeProvider } from "styled-components";

const useTheme: MyThemeProps = {
  palette: {
    paper: "#1C1C1C",
    primary: "#0D2636",
    contrastText: "#fff",
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
  };
}

export default MyThemeProvider;
