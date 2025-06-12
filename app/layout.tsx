import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata, Viewport } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://vikingsalong.axiestudio.se"),
  title: "Viking Salong - Professionell Herrfrisör i Jönköping",
  description: "Viking Salong erbjuder professionell herrklippning och skäggvård i Jönköping med erfarna barberare. Boka tid idag för herrklippning, skäggvård och styling!",
  keywords: [
    "herrfrisör",
    "barberare",
    "skäggvård",
    "herrklippning",
    "Jönköping",
    "Viking Salong",
    "frisör",
    "skäggtrimning",
    "herrfrisör Jönköping",
    "barberare Jönköping",
    "boka frisör",
    "boka barberare",
  ],
  authors: [{ name: "Viking Salong" }],
  creator: "Viking Salong",
  publisher: "Viking Salong",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://vikingsalong.axiestudio.se",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://vikingsalong.axiestudio.se",
    title: "Viking Salong - Professionell Herrfrisör i Jönköping",
    description: "Viking Salong erbjuder professionell herrklippning och skäggvård i Jönköping med erfarna barberare. Boka tid idag!",
    siteName: "Viking Salong",
    images: [
      {
        url: "https://vikingsalong.axiestudio.se/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Viking Salong Logo",
      },
      {
        url: "https://vikingsalong.axiestudio.se/images/hero-background.png",
        width: 1200,
        height: 630,
        alt: "Viking Salong Barberare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viking Salong - Professionell Herrfrisör i Jönköping",
    description: "Viking Salong erbjuder professionell herrklippning och skäggvård i Jönköping med erfarna barberare. Boka tid idag!",
    images: ["https://vikingsalong.axiestudio.se/android-chrome-512x512.png"],
    creator: "@vikingsalong",
    site: "@vikingsalong",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.png",
        color: "#000000",
      },
    ],
  },
  manifest: "/manifest.json",
  applicationName: "Viking Salong",
  appleWebApp: {
    capable: true,
    title: "Viking Salong",
    statusBarStyle: "black-translucent",
  },
  verification: {
    google: "google644c4eebd962f8a0",
  },
  category: "business",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.png" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:locale" content="sv_SE" />
        <meta name="google-site-verification" content="google644c4eebd962f8a0" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}