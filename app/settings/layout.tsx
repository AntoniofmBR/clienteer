import { Metadata } from 'next';

import { Sidebar } from '@/components/sidebar';

export const metadata: Metadata = {
  title: "Clienteer - Configurações",
  description: "Settings",
};


export default function SettingsLayout({
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