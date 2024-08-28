const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET admin statistics
router.get("/", async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const claimCount = await prisma.claim.count();
    const accidentCount = await prisma.accident.count();
    const vehicleCount = await prisma.vehicle.count();

    // Get claims grouped by day
    const claimsPerDay = await prisma.claim.groupBy({
      by: ["date_submitted"],
      _count: {
        id: true,
      },
      orderBy: {
        date_submitted: "asc",
      },
    });
    // Get policies grouped by day
    const policiesPerDay = await prisma.InsurancePolicy.groupBy({
      by: ["start_date"],
      _count: {
        id: true,
      },
      orderBy: {
        start_date: "asc",
      },
    });
    res.status(200).json({
      userCount,
      claimCount,
      accidentCount,
      vehicleCount,
      claimsPerDay,
      policiesPerDay,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET user statistics by user ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userClaimsCount = await prisma.claim.count({
      where: { user_id: parseInt(id) },
    });
    const userVehiclesCount = await prisma.vehicle.count({
      where: { user_id: parseInt(id) },
    });
    const userAccidentsCount = await prisma.accident.count({
      where: {
        AccidentVehicle: {
          some: {
            vehicle: {
              user_id: parseInt(id),
            },
          },
        },
      },
    });

    res.status(200).json({
      userClaimsCount,
      userVehiclesCount,
      userAccidentsCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
