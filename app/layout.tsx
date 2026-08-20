import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreenath-tours-travels.gorishi723.chatgpt.site"),
  title: "Shreenath Tours & Travels | Fleet Operations",
  description: "Premium local, airport and outstation travel powered by a complete fleet operations system.",
  openGraph: {
    title: "Shreenath Tours & Travels",
    description: "Know your entire travel business from one dashboard.",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Shreenath Tours & Travels fleet management" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreenath Tours & Travels",
    description: "Know your entire travel business from one dashboard.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
