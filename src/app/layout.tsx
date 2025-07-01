import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomMDXProvider } from "@/components/mdx-provider";

export const metadata: Metadata = {
  title: "Monadics",
  description: "A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation",
  keywords: ["quantum consciousness", "monads", "mathematics", "computation", "philosophy"],
  authors: [{ name: "LUCI" }],
  openGraph: {
    title: "Monadics",
    description: "A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monadics",
    description: "A cerebral blog exploring theoretical quantum consciousness, mathematical formalisms, and monadic computation",
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
