import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

const getRoboto = Roboto({
  variable: "--font-getRoboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clienteer",
  description: "A Managing Clients System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${getRoboto.variable} bg-background text-foreground px-12 py-7 md:px-20 antialiased`}
      >
        { children }
      </body>
    </html>
  );
}
