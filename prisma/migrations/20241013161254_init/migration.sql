-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT,
    "industry" TEXT,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketCapHistory" (
    "id" SERIAL NOT NULL,
    "stockId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "marketCap" BIGINT NOT NULL,

    CONSTRAINT "MarketCapHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyStockData" (
    "id" SERIAL NOT NULL,
    "stockId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" INTEGER NOT NULL,

    CONSTRAINT "DailyStockData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_symbol_key" ON "Stock"("symbol");

-- CreateIndex
CREATE INDEX "MarketCapHistory_date_marketCap_idx" ON "MarketCapHistory"("date", "marketCap");

-- CreateIndex
CREATE UNIQUE INDEX "MarketCapHistory_stockId_date_key" ON "MarketCapHistory"("stockId", "date");

-- CreateIndex
CREATE INDEX "DailyStockData_date_high_idx" ON "DailyStockData"("date", "high");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStockData_stockId_date_key" ON "DailyStockData"("stockId", "date");

-- AddForeignKey
ALTER TABLE "MarketCapHistory" ADD CONSTRAINT "MarketCapHistory_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyStockData" ADD CONSTRAINT "DailyStockData_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
