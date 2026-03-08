import type {Metadata} from 'next';
import { Epilogue, Inter } from 'next/font/google';
import './globals.css';

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'PatientPal',
  description: 'Your AI-powered health advocate',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${epilogue.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-[#f6f7f8] dark:bg-[#111821] text-slate-900 dark:text-slate-100 antialiased selection:bg-[#1855a1] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
