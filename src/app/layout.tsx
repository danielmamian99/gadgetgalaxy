import Head from 'next/head'
import { inter } from '@/config/fonts'
import './globals.css'

export const meta = {
  siteName: 'Gadgetgalaxy',

  title: 'Gaget Galaxy | Marketplace',
  description:
    'Pertenece al marketplace de productos electrónicos más grande de latinoamérica',
  url: 'https://gadgetgalaxy.com',
  image: '/logo.jpg',
  openGraph: {
    title: 'Gadgets Galaxy',
    description:
      'Pertenece al marketplace de productos electrónicos más grande de latinoamérica',
    url: 'https://gadgetgalaxy.com',
    siteName: 'Gadgetgalaxy',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/logo.jpg',
        alt: 'Wiggot'
      }
    ]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no'
        />
        <title>{meta.title}</title>
        <meta
          name='keywords'
          content='propiedades, CRM inmobiliario, profesionales inmobiliarios, ventas inmobiliarias, clientes potenciales, publicación de propiedades, análisis de mercado inmobiliario, portales inmobiliarios, México'
        />
        <meta name='robots' content='all' />
        <meta name='googlebot' content='index,follow' />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        ></link>
        <meta name='description' content={meta.description} />
        <meta name='title' content={meta.title} />
        <meta property='site_name' content={meta.siteName} />

        <meta property='og:locale' content='es_MX' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={meta.url} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:description' content={meta.description} />
        <meta property='og:image' content={meta.image} />
        <meta property='og:site_name' content={meta.siteName} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:title' content={meta.title} />
        <meta property='twitter:url' content={meta.url} />
        <meta property='twitter:title' content={meta.title} />
        <meta property='twitter:description' content={meta.description} />
        <meta property='twitter:image' content={meta.image} />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
