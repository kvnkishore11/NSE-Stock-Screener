import yahooFinance from 'yahoo-finance2';


export async function fetchStockData(symbol) {
  try {
    const fullSymbol = symbol.endsWith('.NS') ? symbol : `${symbol}.NS`;
    const quote = await yahooFinance.quote(fullSymbol);
    
    return {
      symbol: fullSymbol,
      name: quote.longName,
      price: quote.regularMarketPrice,
      volume: quote.regularMarketVolume,
      change: quote.regularMarketChange,
      change_percent: quote.regularMarketChangePercent,
      market_cap: quote.marketCap,
      pe_ratio: quote.trailingPE,
      dividend_yield: quote.dividendYield,
      sector: quote.sector,
      industry: quote.industry,
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    return null;
  }
}
