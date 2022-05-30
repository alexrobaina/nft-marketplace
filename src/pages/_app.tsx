import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  const moralisServer = process.env.MORALIS_URL_SERVER || "";
  const moralisAppId = process.env.MORALIS_URL_SERVER || "";
  return (
    <SessionProvider session={pageProps.session}>
      <MoralisProvider serverUrl={moralisServer} appId={moralisAppId}>
        <Component {...pageProps} />
      </MoralisProvider>
    </SessionProvider>
  );
}

export default MyApp;
