/*
  Warnings:

  - You are about to drop the `ProductsOnOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProductsOnOrder_productId_orderId_idx";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "orderId" INTEGER;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductsOnOrder";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "price", "status", "title", "userId") SELECT "id", "price", "status", "title", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE INDEX "Order_userId_productId_idx" ON "Order"("userId", "productId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
