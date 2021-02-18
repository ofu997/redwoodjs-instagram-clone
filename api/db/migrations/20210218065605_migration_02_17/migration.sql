/*
  Warnings:

  - You are about to drop the column `poster` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `authorHandle` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `User` table. All the data in the column will be lost.
  - Added the required column `posterId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLikedById` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    "posterId" INTEGER NOT NULL,
    FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("posterId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("id", "body", "imageId") SELECT "id", "body", "imageId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE UNIQUE INDEX "Comment_posterId_unique" ON "Comment"("posterId");
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "likes" INTEGER DEFAULT 0
);
INSERT INTO "new_Image" ("id", "title", "url", "likes") SELECT "id", "title", "url", "likes" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageLikedById" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    FOREIGN KEY ("imageLikedById") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("authorId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("id", "name", "handle", "email", "password") SELECT "id", "name", "handle", "email", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.handle_unique" ON "User"("handle");
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
CREATE UNIQUE INDEX "User_authorId_unique" ON "User"("authorId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
