import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomMDXProvider } from "@/components/mdx-provider";

export const metadata: Metadata = {
  title: {
    default: "Monadics - Quantum Consciousness & Mathematical Computation",
    template: "%s | Monadics"
  },
  description: "A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation. Where minds meet mathematics at the intersection of reality and code.",
  keywords: [
    "quantum consciousness", 
    "monads", 
    "mathematics", 
    "computation", 
    "philosophy",
    "haskell",
    "functional programming",
    "bayesian inference",
    "quantum computing",
    "consciousness studies",
    "orch-or theory",
    "mathematical formalism",
    "theoretical physics",
    "artificial intelligence",
    "cognitive science"
  ],
  authors: [{ name: "LUCI", url: "https://monadics.vercel.app/about" }],
  creator: "LUCI",
  publisher: "Monadics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://monadics.vercel.app'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'Monadics RSS Feed' }
      ]
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Monadics",
    title: "Monadics - Quantum Consciousness & Mathematical Computation",
    description: "A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation. Where minds meet mathematics at the intersection of reality and code.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Monadics - Quantum Consciousness & Mathematical Computation",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@monadics",
    creator: "@monadics",
    title: "Monadics - Quantum Consciousness & Mathematical Computation",
    description: "A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation. Where minds meet mathematics at the intersection of reality and code.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    // yandex: process.env.YANDEX_VERIFICATION,
    // bing: process.env.BING_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomMDXProvider>
            {children}
          </CustomMDXProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
