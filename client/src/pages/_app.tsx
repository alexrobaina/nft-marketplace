import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Layout from 'components/common/Layout';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.scss';
import ProviderWeb3 from 'components/Providers/ProviderWeb3';
// import WalletContext from 'Contexts/ContextWallet';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ProviderWeb3>
        <ThemeProvider>
          <Layout testID="layout-app">
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ProviderWeb3>
    </SessionProvider>
  );
}

export default MyApp;
