
import type { ReactNode } from "react";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}

        {/* Google Analytics - GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PSEK4EQFM9"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PSEK4EQFM9');
          `}
        </Script>
      </body>
    </html>
  );
}
