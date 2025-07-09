import { Metadata } from 'next';

import { Sidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: "Clienteer - Managers",
  description: "All Managers",
};


export default function ManagersLayout({
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