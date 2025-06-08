import type { Metadata } from "next"

export const seoMetadata: Metadata = {
  metadataBase: new URL("https://vikingsalong.axiestudio.se"),
  title: "Viking Salong - Professionell Herrfrisör i Jönköping",
  description:
    "Viking Salong erbjuder professionell herrklippning och skäggvård i Jönköping med erfarna barberare. Boka tid idag för herrklippning, skäggvård och styling!",
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
    description:
      "Viking Salong erbjuder professionell herrklippning och skäggvård i Jönköping med erfarna barberare. Boka tid idag!",
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
    description:
      "Viking Salong erbjuder professionell herrklippning och skäggvård i Jönköping med erfarna barberare. Boka tid idag!",
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
  manifest: "/site.webmanifest",
  applicationName: "Viking Salong",
  appleWebApp: {
    capable: true,
    title: "Viking Salong",
    statusBarStyle: "black-translucent",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
  verification: {
    google: "google644c4eebd962f8a0",
  },
  category: "business.business.HairSalon",
}
