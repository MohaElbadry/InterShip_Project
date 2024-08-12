const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET all claims
router.get("/", async (req, res) => {
  try {
    const claims = await prisma.claim.findMany();
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
    });
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    res.status(200).json(claim);
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
        user_id,
        accident_id,
        claim_number,
        date_submitted,
        status,
        description,
        amount_claimed,
      },
    });
    res.status(201).json(newClaim);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PATCH (update) a claim
router.patch("/", async (req, res) => {
  const {
    id,
    user_id,
    accident_id,
    claim_number,
    date_submitted,
    status,
    description,
    amount_claimed,
  } = req.body;
  try {
    const updatedClaim = await prisma.claim.update({
      where: { id: parseInt(id) },
      data: {
        user_id,
        accident_id,
        claim_number,
        date_submitted,
        status,
        description,
        amount_claimed,
      },
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
