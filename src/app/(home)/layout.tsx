import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import { Toaster } from 'react-hot-toast';
import './home-layout.css';

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <>
    <Toaster position="top-right" />
    {children}
  </>;
}
