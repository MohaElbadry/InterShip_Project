const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET all accident-vehicle relations
router.get("/", async (req, res) => {
  try {
    const accidentVehicles = await prisma.accidentVehicle.findMany();
    res.send(accidentVehicles);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET accident-vehicle relation by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const accidentVehicle = await prisma.accidentVehicle.findUnique({
      where: { id: parseInt(id) },
    });
    if (!accidentVehicle) {
      return res.status(404).json({ message: "Relation not found" });
    }
    res.status(200).json(accidentVehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST a new accident-vehicle relation
router.post("/", async (req, res) => {
  const { accident_id, vehicle_id } = req.body;
  try {
    const newAccidentVehicle = await prisma.accidentVehicle.create({
      data: {
        accident_id,
        vehicle_id,
      },
    });
    res.status(201).json(newAccidentVehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PATCH (update) an accident-vehicle relation
router.patch("/", async (req, res) => {
  const { accident_id, vehicle_id ,id} = req.body;
  try {
    const updatedAccidentVehicle = await prisma.accidentVehicle.update({
      where: { id: parseInt(id) },
      data: {
        accident_id,
        vehicle_id,
      },
    });
    res.status(200).json(updatedAccidentVehicle);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// DELETE an accident-vehicle relation
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const accidentVehicle = await prisma.accidentVehicle.findUnique({
    where: { id: parseInt(id) },
  });
  if (!accidentVehicle) {
    return res.status(404).json({ message: "Accident not Exist" });
  }
  try {
    await prisma.accidentVehicle.delete({
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
