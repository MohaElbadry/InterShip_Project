const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET all insurance policies
router.get("/", async (req, res) => {
  try {
    const policies = await prisma.insurancePolicy.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            license_plate: true,
          },
        },
      },
    });
    res.send(policies);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET all users related to a specific user (e.g., users who are associated with a specific insurance policy)
router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    // Find the user to ensure they exist
    const user = await prisma.user.findUnique({
      where: { id: parseInt(user_id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve related users based on your specific needs
    // For example, get all users who have an insurance policy associated with the given user
    const relatedUsers = await prisma.user.findMany({
      where: {
        insurancePolicies: {
          some: {
            user_id: parseInt(user_id),
          },
        },
      },
    });

    res.status(200).json(relatedUsers);
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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            license_plate: true,
          },
        },
      },
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

// PATCH (update) an insurance policy status
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedPolicy = await prisma.insurancePolicy.update({
      where: { id: parseInt(id) },
      data: { status },
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
