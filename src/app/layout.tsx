import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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
      <body className={cn('min-h-screen font-sans antialiased dark:bg-dot-white/[0.2] bg-dot-black/[0.2]',ubuntu.className)}>
      <Header/>
      {children}
      </body>
    </html>
  );
}
