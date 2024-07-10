import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MENGAI | Mens clothing",
  description: "Discover our latest trends and styles for men's clothing.",
  openGraph: {
    type: "website",
    url: "https://mengai.com",
    title: "MENGAI | Mens clothing",
    description: "Discover our latest trends and styles for men's clothing.",
    images: [
      {
        url: "https://mengai.com/image.jpg",
        width: 800,
        height: 600,
        alt: "MENGAI | Mens clothing",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header/>
      {children}
      </body>
    </html>
  );
}
