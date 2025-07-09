import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { Providers } from '@/components/providers';

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
        className={`${ getRoboto.variable } bg-background text-foreground antialiased`}
      >
        <SessionProvider>
          <Providers>
            { children }
            <Toaster richColors />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
