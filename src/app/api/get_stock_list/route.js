import { NextResponse } from 'next/server';
import { fetchNseStockList } from '../../../utils/stockUtils';

export async function GET() {
  try {
    const stockList = await fetchNseStockList();
    if (stockList.length === 0) {
      return NextResponse.json({ error: 'No stocks fetched. The source might be unavailable.' }, { status: 404 });
    }
    return NextResponse.json(stockList);
  } catch (error) {
    console.error('Error fetching stock list:', error);
    return NextResponse.json({ error: 'Failed to fetch stock list', details: error.message }, { status: 500 });
  }
}
