import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Barlow_Condensed } from "next/font/google";

import "./globals.css";

import PageLoader from "../../components/PageLoader";
import TopBar from "../../components/TopBar";
import Header from "../../components/Header";
import GetInTouch from "../../components/GetInTouch";
import Footer from "../../components/footer";

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

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div
      className={`
        ${manrope.variable}
        ${barlowCondensed.variable}
        min-h-screen
        font-sans
        antialiased
      `}
    >
      <PageLoader />

      <TopBar />

      <Header />

      {children}

      <GetInTouch />

      <Footer />
    </div>
  );
}