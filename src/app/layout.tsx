import type { Metadata } from "next";
import localFont from "next/font/local";
import "./scss/globals.scss";

import HeaderServer from "@/app/ui/Header/header.server";
import HeaderTop from "@/app/ui/HeaderTop/headerTop";
import SliderPartner from "@/app/ui/SliderPartner";
import Footer from "@/app/ui/Footer/page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "СК ОСНОВА",
  description: "Дорожное строительство и поставка нерудных материалов, нерудные материалы +79219806290, дорожные и земляные работы +79217793317",
   icons: {
  icon: '/img/logoWeb.png',
      shortcut: '/img/logoWeb.png',
      apple: '/img/logoWeb.png',
  },
    openGraph:{
      locale:'ru-RU',
        type: 'website',
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <HeaderServer/>
          <div className={`${geistSans.variable} main`}>
          <HeaderTop/>
            <div className={'container'}>
              {children}
              <SliderPartner/>
            </div>

          </div>
      <Footer/>
      </body>
    </html>
  );
}
