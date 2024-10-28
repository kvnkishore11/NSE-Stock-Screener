import axios from 'axios';
import { parse } from 'csv-parse';
import { fetchStockData } from './stockData';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchAndStoreNseStockList() {
  try {
    const url = "https://archives.nseindia.com/content/equities/EQUITY_L.csv";
    const response = await axios.get(url);
    
    return new Promise((resolve, reject) => {
      parse(response.data, {
        columns: true,
        skip_empty_lines: true
      }, async (err, records) => {
        if (err) {
          reject(err);
        } else {
          for (const record of records) {
            const symbol = record.SYMBOL;
            const stockData = await fetchStockData(symbol);
            if (stockData) {
              await upsertStockData(symbol, record['NAME OF COMPANY'], stockData);
            }
          }
          resolve(await getAllStocks());
        }
      });
    });
  } catch (error) {
    console.error("Error fetching NSE stock list:", error);
    throw error;
  }
}

async function upsertStockData(symbol, name, stockData) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.stock.upsert({
    where: { symbol: symbol },
    update: {
      name: name,
      sector: stockData.sector,
      industry: stockData.industry,
      marketCapHistory: {
        create: {
          date: today,
          marketCap: BigInt(stockData.market_cap || 0)
        }
      },
      dailyData: {
        create: {
          date: today,
          open: stockData.open || 0,
          high: stockData.high || 0,
          low: stockData.low || 0,
          close: stockData.price || 0,
          volume: stockData.volume || 0
        }
      }
    },
    create: {
      symbol: symbol,
      name: name,
      sector: stockData.sector,
      industry: stockData.industry,
      marketCapHistory: {
        create: {
          date: today,
          marketCap: BigInt(stockData.market_cap || 0)
        }
      },
      dailyData: {
        create: {
          date: today,
          open: stockData.open || 0,
          high: stockData.high || 0,
          low: stockData.low || 0,
          close: stockData.price || 0,
          volume: stockData.volume || 0
        }
      }
    }
  });
}

export async function getAllStocks() {
  return prisma.stock.findMany({
    include: {
      marketCapHistory: {
        orderBy: { date: 'desc' },
        take: 1
      },
      dailyData: {
        orderBy: { date: 'desc' },
        take: 1
      }
    }
  });
}

export async function getNseStockList() {
  return getAllStocks();
}
