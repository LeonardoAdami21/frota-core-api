-- CreateTable
CREATE TABLE "fuelings" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "liters" DECIMAL(10,3) NOT NULL,
    "total_cost" DECIMAL(10,2) NOT NULL,
    "odometer" INTEGER NOT NULL,
    "fueled_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuelings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fuelings_vehicle_id_idx" ON "fuelings"("vehicle_id");

-- AddForeignKey
ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
