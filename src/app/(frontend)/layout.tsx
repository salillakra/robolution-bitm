import { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientLayout } from '@/components/ClientLayout'
import SmoothScroll from '@/components/SmoothScroll'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Robolution | BIT Mesra | Robotics Club of BIT Mesra',
    template: '%s | Robolution BIT Mesra',
  },
  description:
    'Robolution is the official robotics and innovation club of BIT Mesra. We build robots, compete nationally, and push hands-on engineering through workshops, projects, and tech events.',
  keywords: [
    'Robolution',
    'BIT Mesra',
    'Robotics Club',
    'Engineering Club',
    'Robotics Society',
    'Student Robotics',
    'BIT Mesra Robotics',
    'Tech Club',
  ],
  authors: [{ name: 'Robolution BIT Mesra' }],
  creator: 'Robolution BIT Mesra',
  openGraph: {
    title: 'Robolution | Robotics Club of BIT Mesra',
    description:
      'Official robotics club of BIT Mesra focused on innovation, competitions, and real-world engineering.',
    siteName: 'Robolution',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Robolution | BIT Mesra | Robotics Club of BIT Mesra',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robolution | Robotics Club of BIT Mesra',
    description: 'Building robots. Competing hard. Learning engineering the real way.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // metadataBase: new URL('https://robolution.bitmesra.ac.in'),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans isolate`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScroll />
          <main>
            <ClientLayout>{children}</ClientLayout>
          </main>
        </ThemeProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3LKNP3KLNW" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', 'G-3LKNP3KLNW');
            `}
        </Script>
      </body>
    </html>
  )
}
