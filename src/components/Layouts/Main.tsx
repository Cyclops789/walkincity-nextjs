import Head from 'next/head'
import Script from 'next/script'

type LayoutProps = {
  children: React.ReactNode
  title?: string
}

export default function Layout({
  children,
  title = 'WalkIn.City',
}: LayoutProps) {

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=2.0, width=device-width" />
        <Script
          defer 
          data-domain={"walkin.city"}
          data-api={`https://${process.env.NEXT_PUBLIC_CF_WORKER_HOSTNAME}/getvideos/videos`}
          src={`https://${process.env.NEXT_PUBLIC_CF_WORKER_HOSTNAME}/getvideos/script.js`} 
        />
      </Head>
      {children}
    </div>
  )
}
