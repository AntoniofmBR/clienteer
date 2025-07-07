import { Metadata } from 'next';

import { Sidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: "Clienteer - Servidores",
  description: "All Servers",
};


export default function ServersLayout({
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