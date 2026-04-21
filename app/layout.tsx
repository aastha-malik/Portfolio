import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aastha Malik — Portfolio",
  description: "Backend Developer. API design to cloud deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=cabinet-grotesk@500,700,800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
