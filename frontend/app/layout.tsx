import { Poppins, JetBrains_Mono } from 'next/font/google';
import { PageTransition } from '../components/ui/PageTransition';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'SumoPower - Power up like a SUMO',
  description: 'Penyedia baterai HP original dan aksesoris pengisian daya untuk seluruh Indonesia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${poppins.variable} ${mono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans bg-paper text-ink antialiased">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
