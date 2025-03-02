import './globals.css'
import { RootProvider } from 'fumadocs-ui/provider';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import NextAuthSessionProvider from "@/components/providers/SessionProvider";
import { auth } from "@/auth";

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
        <NextAuthSessionProvider session={session}>
          <RootProvider>{children}</RootProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

