import type { Metadata}   from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'bytespace',
  description: 'bytespace web',
  icons: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-zinc-950 overflow-x-hidden antialiased `}>
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
