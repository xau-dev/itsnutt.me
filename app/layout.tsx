import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScrollProvider from "./components/SmoothScroll";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "xaudev - Nutt's Portfolio",
  description: "Developer, security researcher, designer and FPV pilot",
  metadataBase: new URL("https://itsnutt.me"),
  openGraph: {
    title: "xaudev - Nutt's Portfolio",
    description: "Developer, security researcher, designer and FPV pilot",
    url: "https://itsnutt.me",
    siteName: "itsnutt.me",
    images: [
      {
        url: "/images/test.png",
        width: 1200,
        height: 630,
        alt: "xaudev portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "xaudev - Nutt's Portfolio",
    description: "Developer, security researcher, designer and FPV pilot",
    images: ["/images/test.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", spaceGrotesk.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider options={{ lerp: 0.08, wheelMultiplier: 0.7 }}>
          {children}
        </SmoothScrollProvider>
        <script
          data-goatcounter="https://xaudev.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        />
      </body>
    </html>
  );
}
