'use client';
import Navbar from './_components/Navbar';
import { CartProvider } from './_context/CartContext';
import { SearchProvider } from './_context/SearchContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <SearchProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
