const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET all accidents
router.get("/", async (req, res) => {
  try {
    const accidents = await prisma.accident.findMany();
    res.send(accidents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET accident by ID with associated vehicles
// GET accident by ID with associated vehicles using a natural join-like approach
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const accidentId = parseInt(id, 10); // Convert id to integer

  if (isNaN(accidentId)) {
    return res.status(400).json({ error: "Invalid accident ID" });
  }

  try {
    const accident = await prisma.accident.findUnique({
      where: { id: accidentId },
      include: {
        AccidentVehicle: {
          include: {
            vehicle: true, // This pulls the vehicles related to the accident via the AccidentVehicle model
          },
        },
      },
    });

    if (!accident) {
      return res.status(404).json({ error: "Accident not found" });
    }

    // Extract the vehicles from the AccidentVehicle relation
    const vehicles = accident.AccidentVehicle.map((av) => av.vehicle);

    // Return accident details and the associated vehicles
    res.status(200).json({
      accident: {
        id: accident.id,
        date: accident.date,
        location: accident.location,
        description: accident.description,
      },
      vehicles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// GET all accidents related to a specific user's vehicles
router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    // Step 1: Retrieve all accidents related to the user's vehicles
    const accidents = await prisma.accident.findMany({
      where: {
        AccidentVehicle: {
          some: {
            vehicle: {
              user_id: parseInt(user_id, 10),
            },
          },
        },
      },
    });

    if (accidents.length === 0) {
      return res
        .status(404)
        .json({ message: "No accidents found for this user." });
    }

    res.status(200).json(accidents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST a new accident
router.post("/", async (req, res) => {
  const { date, location, description } = req.body;
  try {
    const newAccident = await prisma.accident.create({
      data: {
        date,
        location,
        description,
      },
    });
    res.status(201).json(newAccident);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PATCH (update) an accident
router.patch("/", async (req, res) => {
  const { date, location, description, id } = req.body;
  try {
    const updatedAccident = await prisma.accident.update({
      where: { id: parseInt(id) },
      data: {
        date,
        location,
        description,
      },
    });
    res.status(200).json(updatedAccident);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE an accident
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const accident = await prisma.accident.findUnique({
    where: { id: parseInt(id) },
  });
  if (!accident) {
    return res.status(404).json({ message: "Accident not Exist" });
  }
  try {
    await prisma.accident.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2003") {
      // Prisma error code for foreign key constraint failure
      res.status(400).send({
        message: "Cannot delete accident as it is referenced in another table.",
      });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

module.exports = router;
