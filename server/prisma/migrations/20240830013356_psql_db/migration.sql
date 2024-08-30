-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archived_user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "archived_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "archived_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance_policy" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "policy_number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "insurance_policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archived_insurance_policy" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "policy_number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "archived_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "archived_insurance_policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "license_plate" TEXT NOT NULL,
    "picture_url" TEXT,
    "vin_number" TEXT NOT NULL,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archived_vehicle" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "license_plate" TEXT NOT NULL,
    "picture_url" TEXT,
    "vin_number" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "archived_vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accident" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "accident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archived_accident" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "archived_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "archived_accident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "accident_id" INTEGER NOT NULL,
    "claim_number" TEXT,
    "date_submitted" TIMESTAMP(3) NOT NULL,
    "date_modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "description" TEXT NOT NULL,
    "amount_claimed" DOUBLE PRECISION,

    CONSTRAINT "claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archived_claim" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "accident_id" INTEGER NOT NULL,
    "claim_number" TEXT NOT NULL,
    "date_submitted" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount_claimed" DOUBLE PRECISION NOT NULL,
    "archived_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "archived_claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accident_vehicle" (
    "id" SERIAL NOT NULL,
    "accident_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,

    CONSTRAINT "accident_vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccidentVehicle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "insurance_policy_policy_number_key" ON "insurance_policy"("policy_number");

-- CreateIndex
CREATE UNIQUE INDEX "archived_insurance_policy_policy_number_key" ON "archived_insurance_policy"("policy_number");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_vin_number_key" ON "vehicle"("vin_number");

-- CreateIndex
CREATE UNIQUE INDEX "claim_claim_number_key" ON "claim"("claim_number");

-- CreateIndex
CREATE UNIQUE INDEX "archived_claim_claim_number_key" ON "archived_claim"("claim_number");

-- CreateIndex
CREATE UNIQUE INDEX "_AccidentVehicle_AB_unique" ON "_AccidentVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_AccidentVehicle_B_index" ON "_AccidentVehicle"("B");

-- AddForeignKey
ALTER TABLE "insurance_policy" ADD CONSTRAINT "insurance_policy_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_policy" ADD CONSTRAINT "insurance_policy_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_accident_id_fkey" FOREIGN KEY ("accident_id") REFERENCES "accident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accident_vehicle" ADD CONSTRAINT "accident_vehicle_accident_id_fkey" FOREIGN KEY ("accident_id") REFERENCES "accident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accident_vehicle" ADD CONSTRAINT "accident_vehicle_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccidentVehicle" ADD CONSTRAINT "_AccidentVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "accident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccidentVehicle" ADD CONSTRAINT "_AccidentVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
