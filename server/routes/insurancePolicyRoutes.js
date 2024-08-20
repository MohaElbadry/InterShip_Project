const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET all insurance policies
router.get("/", async (req, res) => {
  try {
    const policies = await prisma.insurancePolicy.findMany();
    res.send(policies);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET all insurance policies for a specific user
router.get("/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const policies = await prisma.insurancePolicy.findMany({
      where: { user_id: userId },
      include: {
        vehicle: {
          select: {
            make: true,
            model: true,
          },
        },
      },
    });
    res.send(policies);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET insurance policy by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const policy = await prisma.insurancePolicy.findUnique({
      where: { id: parseInt(id) },
    });
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST a new insurance policy
router.post("/", async (req, res) => {
  const {
    user_id,
    vehicle_id,
    policy_number,
    type,
    start_date,
    end_date,
    amount,
    status,
  } = req.body;
  try {
    const newPolicy = await prisma.insurancePolicy.create({
      data: {
        user_id,
        vehicle_id,
        policy_number,
        type,
        start_date,
        end_date,
        amount,
        status,
      },
    });
    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PATCH (update) an insurance policy
router.patch("/", async (req, res) => {
  const {
    id,
    user_id,
    vehicle_id,
    policy_number,
    type,
    start_date,
    end_date,
    amount,
    status,
  } = req.body;
  try {
    const updatedPolicy = await prisma.insurancePolicy.update({
      where: { id: parseInt(id) },
      data: {
        user_id,
        vehicle_id,
        policy_number,
        type,
        start_date,
        end_date,
        amount,
        status,
      },
    });
    res.status(200).json(updatedPolicy);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE an insurance policy
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const insurance = await prisma.insurancePolicy.findUnique({
    where: { id: parseInt(id) },
  });
  if (!insurance) {
    return res.status(404).json({ message: "Claim not Exist" });
  }
  try {
    await prisma.insurancePolicy.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No Content
  } catch (error) {
    if (error.code === "P2003") {
      // Prisma error code for foreign key constraint failure
      res.status(400).send({
        message: "Cannot delete claim as it is referenced in another table.",
      });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

module.exports = router;
