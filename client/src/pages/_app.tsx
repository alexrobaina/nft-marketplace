import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Layout from 'components/common/Layout';
import { ThemeProvider } from 'next-themes';
import ProviderWeb3 from 'components/Providers/ProviderWeb3';
import '../styles/globals.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ProviderWeb3>
          <ThemeProvider>
            <Layout testID="layout-app">
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ProviderWeb3>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
