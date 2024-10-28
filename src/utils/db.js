import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function upsertStock(stockData) {
  return prisma.stock.upsert({
    where: { symbol: stockData.symbol },
    update: stockData,
    create: stockData,
  })
}

export async function getAllStocks() {
  return prisma.stock.findMany()
}

export async function getStockBySymbol(symbol) {
  return prisma.stock.findUnique({
    where: { symbol },
  })
}
