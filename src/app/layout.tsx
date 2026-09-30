import type { Metadata } from "next";
import { Manrope, Barlow_Condensed } from "next/font/google";
import "./globals.css";

import GetInTouch from "./components/GetInTouch";
import PageLoader from "./components/PageLoader";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Modura Design Group",
  description:
    "Architecture, Engineering, BIM, Structural Design and Outsourcing Services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${barlowCondensed.variable}`}
    >
      <body className="font-sans antialiased">

        <PageLoader />

        {children}

        <GetInTouch />

      </body>
    </html>
  );
}