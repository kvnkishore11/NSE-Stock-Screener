import React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'NSE Indian Stock Data',
  description: 'Web application for fetching and displaying NSE Indian stock data',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
