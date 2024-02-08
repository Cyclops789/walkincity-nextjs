import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from "next-auth/react";
import '@/styles/index.css';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return ( 
    <SessionProvider session={session} refetchInterval={24 * 3600}>
      <NextNProgress color='var(--primary-text-color)' /> 
      <Component {...pageProps} />
    </SessionProvider>
  )
};