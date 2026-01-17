-- CreateTable
CREATE TABLE "RolesOnChampions" (
    "roleId" INTEGER NOT NULL,
    "championId" INTEGER NOT NULL,

    CONSTRAINT "RolesOnChampions_pkey" PRIMARY KEY ("roleId","championId")
);

-- AddForeignKey
ALTER TABLE "RolesOnChampions" ADD CONSTRAINT "RolesOnChampions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnChampions" ADD CONSTRAINT "RolesOnChampions_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
