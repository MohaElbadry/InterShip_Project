const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.send(vehicles);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET vehicle by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: parseInt(id) },
    });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST a new vehicle
router.post("/", async (req, res) => {
  const { user_id, make, model, year, license_plate, vin_number } = req.body;
  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        user_id,
        make,
        model,
        year,
        license_plate,
        vin_number,
      },
    });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PATCH (update) a vehicle
router.patch("/", async (req, res) => {
  const { id, user_id, make, model, year, license_plate, vin_number } =
    req.body;
  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: parseInt(id) },
      data: {
        user_id,
        make,
        model,
        year,
        license_plate,
        vin_number,
      },
    });
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE a vehicle
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: parseInt(id) },
  });
  if (!vehicle) {
    return res.status(404).json({ message: "Vehicle not Exist" });
  }
  try {
    await prisma.vehicle.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No Content
  } catch (error) {
    if (error.code === "P2003") {
      // Prisma error code for foreign key constraint failure
      res.status(400).send({
        message: "Cannot delete vehicle as it is referenced in another table.",
      });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

module.exports = router;
