import "./globals.css";

import { Inter } from "@next/font/google";
const inter = Inter();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Vajitsu</title>
        <meta name="description" content="Ship your projects with ease" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="screen">{children}</div>
      </body>
    </html>
  );
}
