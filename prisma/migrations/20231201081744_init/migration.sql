/*
  Warnings:

  - You are about to drop the column `quantity` on the `ProductsOnOrder` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Category` table. All the data in the column will be lost.
  - Added the required column `price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "status", "title", "userId") SELECT "id", "status", "title", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "price" REAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("id", "image", "orderId", "title") SELECT "id", "image", "orderId", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_ProductsOnOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "ProductsOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductsOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductsOnOrder" ("id", "orderId", "price", "productId") SELECT "id", "orderId", "price", "productId" FROM "ProductsOnOrder";
DROP TABLE "ProductsOnOrder";
ALTER TABLE "new_ProductsOnOrder" RENAME TO "ProductsOnOrder";
CREATE INDEX "ProductsOnOrder_productId_orderId_idx" ON "ProductsOnOrder"("productId", "orderId");
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL
);
INSERT INTO "new_Category" ("authorId", "id", "title") SELECT "authorId", "id", "title" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
