import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'bytespace',
  description: 'bytespace web',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-br from-[#0f0f1c] via-[#1a1a2e] to-[#0f0f1c] overflow-x-hidden antialiased `}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
