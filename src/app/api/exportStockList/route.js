import { NextResponse } from 'next/server';
import { fetchNseStockList, convertToCSV } from '../../../utils/stockUtils';

export async function GET() {
  try {
    const stockList = await fetchNseStockList();
    const csvContent = convertToCSV(stockList);

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=nse_stock_list.csv'
      }
    });
  } catch (error) {
    console.error('Error exporting stock list:', error);
    return NextResponse.json({ error: 'Failed to export stock list', details: error.message }, { status: 500 });
  }
}
