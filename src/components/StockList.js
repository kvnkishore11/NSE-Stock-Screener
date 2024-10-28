"use client";

import React, { useState } from 'react';

export default function StockList() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/get_stock_list');
      if (!response.ok) {
        throw new Error('Failed to fetch stock list');
      }
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mt-8">
      <button
        onClick={fetchStockList}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch NSE Stock List'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {stocks.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Company Name</th>
                <th className="px-4 py-2">Market Value</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.symbol} className="border-b">
                  <td className="px-4 py-2">{stock.symbol}</td>
                  <td className="px-4 py-2">{stock.name}</td>
                  <td className="px-4 py-2">{stock.market_cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
