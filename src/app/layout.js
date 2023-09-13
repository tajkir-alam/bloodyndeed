import AuthProvider from '@/Providers/AuthProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import Nav from '@/Components/Nav';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bloodyndeed',
  description: 'Get Blood When You Need',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <Nav></Nav>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
