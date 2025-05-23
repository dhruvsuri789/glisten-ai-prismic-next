import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import localFont from 'next/font/local';
import './globals.css';

const dmSans = localFont({
  src: '../../public/fonts/DMSans-variable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-dm-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
