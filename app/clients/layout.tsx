import { Metadata } from 'next';

import { Sidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: "Clienteer - Clientes",
  description: "All Clients",
};


export default function ClientsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Sidebar>
      { children }
    </Sidebar>
  )
}