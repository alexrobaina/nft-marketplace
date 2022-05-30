import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MoralisProvider
        serverUrl="https://l4rmg5pomqwf.usemoralis.com:2053/server"
        appId="AXn5ZFR8XAQ9bqZg5nHxqozBT7yyJDUEyrqVG07B"
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </SessionProvider>
  );
}

export default MyApp;
