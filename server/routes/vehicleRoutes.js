const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST a new vehicle
router.post("/", upload.single("picture"), async (req, res) => {
  let { user_id, make, model, year, license_plate, vin_number } = req.body;
  user_id = parseInt(user_id, 10); // Convert user_id to integer
  year = parseInt(year, 10); // Convert year to integer

  // Set default image if no picture is uploaded
  const picture_url = req.file
    ? `/uploads/${req.file.filename}`
    : `/uploads/none.jpg`;

  if (isNaN(user_id) || isNaN(year)) {
    return res
      .status(400)
      .json({ error: "Invalid data type for user_id or year" });
  }

  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        user_id,
        make,
        model,
        year,
        license_plate,
        vin_number,
        picture_url,
      },
    });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PATCH (update) a vehicle
router.patch("/", upload.single("picture"), async (req, res) => {
  let { id, user_id, make, model, year, license_plate, vin_number } = req.body;
  id = parseInt(id, 10); // Convert id to integer
  user_id = parseInt(user_id, 10); // Convert user_id to integer
  year = parseInt(year, 10); // Convert year to integer
  const picture_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (isNaN(id) || isNaN(user_id) || isNaN(year)) {
    return res
      .status(400)
      .json({ error: "Invalid data type for id, user_id, or year" });
  }

  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        user_id,
        make,
        model,
        year,
        license_plate,
        vin_number,
        picture_url,
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
  try {
    // Find the vehicle to be deleted
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: parseInt(id) },
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle does not exist" });
    }

    // Archive the vehicle
    await prisma.archivedVehicle.create({
      data: {
        user_id: vehicle.user_id,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        license_plate: vehicle.license_plate,
        picture_url: vehicle.picture_url,
        vin_number: vehicle.vin_number,
      },
    });

    // Delete the vehicle from the Vehicle table
    await prisma.vehicle.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // No Content
  } catch (error) {
    if (error.code === "P2003") {
      res.status(400).send({
        message: "Cannot delete vehicle as it is referenced in another table.",
      });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

module.exports = router;
