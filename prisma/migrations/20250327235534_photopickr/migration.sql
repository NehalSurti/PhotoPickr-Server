-- CreateTable
CREATE TABLE "PhotoPickr" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expire_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhotoPickr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoPickrItem" (
    "id" SERIAL NOT NULL,
    "PhotoPickr_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhotoPickrItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoPickrComments" (
    "id" SERIAL NOT NULL,
    "PhotoPickr_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhotoPickrComments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PhotoPickr_expire_at_title_idx" ON "PhotoPickr"("expire_at", "title");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- AddForeignKey
ALTER TABLE "PhotoPickr" ADD CONSTRAINT "PhotoPickr_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoPickrItem" ADD CONSTRAINT "PhotoPickrItem_PhotoPickr_id_fkey" FOREIGN KEY ("PhotoPickr_id") REFERENCES "PhotoPickr"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoPickrComments" ADD CONSTRAINT "PhotoPickrComments_PhotoPickr_id_fkey" FOREIGN KEY ("PhotoPickr_id") REFERENCES "PhotoPickr"("id") ON DELETE CASCADE ON UPDATE CASCADE;
