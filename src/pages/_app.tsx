import MyThemeProvider from "@/providers/MyThemeProvider";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { FC } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html, body {
  width: 100%;
  min-height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
}
* {
  box-sizing: border-box;
}
#__next {
  flex: 1;
  min-height: 100%;
  @media (max-width: 768px) {
  }
}
`;

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <MyThemeProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </MyThemeProvider>
    </>
  );
}

export default MyApp;
