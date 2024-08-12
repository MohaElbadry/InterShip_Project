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

// GET accident by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const accident = await prisma.accident.findUnique({
      where: { id: parseInt(id) },
    });
    if (!accident) {
      return res.status(404).json({ message: "Accident not found" });
    }
    res.status(200).json(accident);
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
