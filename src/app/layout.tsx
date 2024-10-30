import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "СК ОСНОВА",
  description: "дорожное строительство и поставка нерудных материалов, нерудные материалы +79219806290, дорожные и земляные работы +79217793317",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
