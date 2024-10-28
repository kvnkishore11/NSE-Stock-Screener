import React from 'react';
import StockList from '../components/StockList';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">NSE Indian Stock Data</h1>
      <p className="mb-4">Welcome to the NSE Indian Stock Data application. Here you can fetch and display stock data for NSE-listed companies.</p>
      <StockList />
    </div>
  );
}
