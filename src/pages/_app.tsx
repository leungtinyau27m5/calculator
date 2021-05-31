import MyThemeProvider from "@/providers/MyThemeProvider";
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

function MyApp({ Component, pageProps }) {
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
