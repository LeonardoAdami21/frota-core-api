-- CreateTable
CREATE TABLE "maintenances" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DECIMAL(10,2) NOT NULL,
    "odometer" INTEGER NOT NULL,
    "performed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "maintenances_vehicle_id_idx" ON "maintenances"("vehicle_id");

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
