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

// GET all vehicles for a specific user
router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        user_id: parseInt(user_id, 10),
      },
    });
    res.status(200).json(vehicles);
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
router.patch("/:id", upload.single("picture"), async (req, res) => {
  const { id } = req.params;
  const vehicleId = parseInt(id, 10); // Convert id to integer
  let { user_id, make, model, year, license_plate, vin_number } = req.body;
  const picture_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (isNaN(vehicleId)) {
    return res.status(400).json({ error: "Invalid vehicle ID" });
  }

  // Create a data object only with provided fields
  const data = {};

  if (user_id !== undefined) data.user_id = parseInt(user_id, 10);
  if (make !== undefined) data.make = make;
  if (model !== undefined) data.model = model;
  if (year !== undefined) {
    const parsedYear = parseInt(year, 10);
    if (isNaN(parsedYear) || parsedYear <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid year. It must be a positive integer." });
    }
    data.year = parsedYear;
  }
  if (license_plate !== undefined) data.license_plate = license_plate;
  if (vin_number !== undefined) data.vin_number = vin_number;
  if (picture_url !== null) data.picture_url = picture_url;

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data,
    });
    res.status(200).json(updatedVehicle);
  } catch (error) {
    if (error.code === "P2002") {
      // Unique constraint violation (e.g., VIN number must be unique)
      res.status(400).json({
        error: "Unique constraint violation. Please check the VIN number ",
      });

    } else if (error.code === "P2025") {
      // Record not found
      res.status(404).json({ error: "Vehicle not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// DELETE a vehicle
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const vehicleId = parseInt(id);

  try {
    // Begin transaction
    const transaction = await prisma.$transaction(async (prisma) => {
      // Find the vehicle to be deleted
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
      });

      if (!vehicle) {
        throw new Error("Vehicle does not exist");
      }

      // Attempt to delete the vehicle (to check FK constraints)
      try {
        await prisma.vehicle.delete({
          where: { id: vehicleId },
        });
      } catch (error) {
        if (error.code === "P2003") {
          throw new Error(
            "Cannot delete vehicle as it is referenced in another table."
          );
        }
        if (error.code === "P2002") {
          throw new Error("Unique constraint violation.");
        }
        throw error;
      }

      // If deletion was successful, archive the vehicle
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

      res.status(200); // No Content
    });

    res.status(200).send(); // No Content
  } catch (error) {
    if (
      error.message ===
      "Cannot delete vehicle as it is referenced in another table."
    ) {
      res.status(400).send({
        message: error.message,
      });
    } else if (error.message === "Vehicle does not exist") {
      res.status(404).send({
        message: error.message,
      });
    } else if (error.message === "Unique constraint violation.") {
      res.status(400).send({
        message: error.message,
      });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

module.exports = router;
