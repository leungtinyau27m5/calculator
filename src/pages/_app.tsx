import MyThemeProvider from "@/providers/MyThemeProvider";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { FC } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html, body {
  width: 100%;
  height: 100%;
  height: -webkit-fill-available;
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}
#__next {
  width: 100%;
  height: 100%;
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
