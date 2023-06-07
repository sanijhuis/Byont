-- CreateEnum
CREATE TYPE "Scanner" AS ENUM ('SLITHER', 'MYTHRIL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "githubAccessToken" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Repo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanOutput" (
    "id" SERIAL NOT NULL,
    "repoId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScanOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanOutputItem" (
    "id" SERIAL NOT NULL,
    "scanOutputId" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "slither" JSONB,
    "mythril" JSONB,
    "chatgpt" TEXT,

    CONSTRAINT "ScanOutputItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubAccessToken_key" ON "User"("githubAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Repo_name_owner_key" ON "Repo"("name", "owner");

-- AddForeignKey
ALTER TABLE "Repo" ADD CONSTRAINT "Repo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanOutput" ADD CONSTRAINT "ScanOutput_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanOutputItem" ADD CONSTRAINT "ScanOutputItem_scanOutputId_fkey" FOREIGN KEY ("scanOutputId") REFERENCES "ScanOutput"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
