import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EmailSniff - Free Disposable Email Checker & Verification API',
  description: 'Fast free API to detect temporary & disposable email addresses in 10ms. Check format, verify DNS/MX records, and ping SMTP directly. No signup.',
  generator: 'v0.app',
  keywords: [
    'disposable email checker',
    'temporary email detector',
    'free email verification api',
    'check email existence',
    'verify email mx records',
    'smtp email validator',
    'fake signup prevention',
    'detect temporary domains'
  ],
  openGraph: {
    title: 'EmailSniff - Free Disposable Email Checker & Verification API',
    description: 'Fast free API to detect temporary & disposable email addresses in 10ms. Check format, verify DNS/MX records, and ping SMTP directly. No signup.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EmailSniff - Disposable Email Checker API',
    description: 'Banish fake emails. Keep database vibes clean. Free real-time temporary email validation in 10ms.',
  },
  icons: {
    icon: [
      {
        url: '/logo.png',
        type: 'image/png',
      },
    ],
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'EmailSniff',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0.00',
      'priceCurrency': 'USD'
    },
    'description': 'Fast free API to detect temporary & disposable email addresses in 10ms. Check formats, verify DNS/MX records, and validate SMTP mailboxes in real-time.',
  };

  return (
    <html lang="en" className="bg-white">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-white overflow-x-clip">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
