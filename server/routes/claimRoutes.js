const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET all claims
router.get("/", async (req, res) => {
  try {
    const claims = await prisma.claim.findMany({
      include: {
        accident: {
          select: {
            date: true,
            description: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.send(claims);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET claim by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const claim = await prisma.claim.findUnique({
      where: { id: parseInt(id) },
      include: {
        accident: {
          select: {
            date: true,
            description: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    res.status(200).json(claim);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET all claims by user_id
router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const claims = await prisma.claim.findMany({
      where: { user_id: parseInt(user_id, 10) },
      include: {
        accident: {
          select: {
            date: true,
            description: true,
          },
        },
      },
    });
    if (claims.length === 0) {
      return res
        .status(404)
        .json({ message: "No claims found for this user." });
    }
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST a new claim
router.post("/", async (req, res) => {
  const {
    user_id,
    accident_id,
    claim_number,
    date_submitted,
    status,
    description,
    amount_claimed,
  } = req.body;
  try {
    const newClaim = await prisma.claim.create({
      data: {
        user_id: parseInt(user_id),
        accident_id: parseInt(accident_id),
        claim_number: claim_number || undefined,
        date_submitted: new Date(date_submitted),
        status: status || undefined,
        description,
        amount_claimed: amount_claimed ? parseFloat(amount_claimed) : undefined,
      },
    });
    res.status(201).json(newClaim);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PATCH (update) a claim
router.patch("/", async (req, res) => {
  const { id, ...updateData } = req.body; // Destructure id and gather the rest
  const data = { date_modification: new Date() }; // Set current date for modification

  // Only add fields that are present in the request body
  if (updateData.claim_number !== undefined)
    data.claim_number = updateData.claim_number;
  if (updateData.status !== undefined) data.status = updateData.status;
  if (updateData.amount_claimed !== undefined)
    data.amount_claimed = parseFloat(updateData.amount_claimed);

  try {
    const updatedClaim = await prisma.claim.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE a claim
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const claim = await prisma.claim.findUnique({
    where: { id: parseInt(id) },
  });
  if (!claim) {
    return res.status(404).json({ message: "Claim not Exist" });
  }
  try {
    await prisma.claim.delete({
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
