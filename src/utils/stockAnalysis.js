import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getHighPerformingStocks() {
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  const highPerformingStocks = await prisma.stock.findMany({
    where: {
      marketCapHistory: {
        some: {
          date: {
            lte: twoYearsAgo
          },
          marketCap: {
            gte: 10000000n // BigInt for large market cap values
          }
        }
      }
    },
    include: {
      dailyData: {
        orderBy: {
          high: 'desc'
        },
        take: 1
      },
      marketCapHistory: {
        where: {
          date: {
            lte: twoYearsAgo
          }
        },
        orderBy: {
          marketCap: 'desc'
        },
        take: 1
      }
    }
  });

  const result = highPerformingStocks.map(stock => ({
    symbol: stock.symbol,
    name: stock.name,
    allTimeHigh: stock.dailyData[0] ? stock.dailyData[0].high : null,
    allTimeHighDate: stock.dailyData[0] ? stock.dailyData[0].date : null,
    marketCap: stock.marketCapHistory[0] ? Number(stock.marketCapHistory[0].marketCap) : null,
    marketCapDate: stock.marketCapHistory[0] ? stock.marketCapHistory[0].date : null
  }));

  return result;
}