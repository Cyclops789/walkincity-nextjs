import Head from 'next/head'

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
        <script defer data-domain="walkin.city" src="https://analytics.walkin.city/js/script.js"></script>
        <meta name="viewport" content="initial-scale=2.0, width=device-width" />
      </Head>
      {children}
    </div>
  )
}
