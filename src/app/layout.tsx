import './globals.css'
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextAuthSessionProvider from "@/components/providers/SessionProvider";
import { auth } from "@/auth";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
    title: "QA Flow",
    description: "QA Flow - Test Management Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen">
        <Toaster position="top-right" />
        <NextAuthSessionProvider session={session}>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

