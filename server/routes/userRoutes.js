const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    address,
    contact_number,
    date_of_birth,
  } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already in use Try to use an other one" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        address,
        contact_number,
        date_of_birth,
      },
    });

    // Generate a token
    const token = jwt.sign(
      { user_id: newUser.id, email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Respond with the created user and token
    res.status(201).json({
      status: true,
      user: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during user creation" });
  }
});

// PATCH (update) a user - Authenticated route
router.patch("/", authMiddleware, async (req, res) => {
  const {
    id,
    name,
    email,
    password,
    role,
    address,
    contact_number,
    date_of_birth,
  } = req.body;
  try {
    const updatedData = {
      name,
      email,
      role,
      address,
      contact_number,
      date_of_birth,
    };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });
    res.status(200).json({
      status: true,
      message: "User Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (!user) {
    return res.status(404).json({ message: "User not Exist" });
  }
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2003") {
      // Prisma error code for foreign key constraint failure
      res.status(400).send({
        message: "Cannot delete user as it is referenced in another table.",
      });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

//=========>New Routes<==========//
// GET all vehicles by user_id
router.get("/vehicle/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { user_id: parseInt(user_id, 10) },
    });
    if (vehicles.length === 0) {
      return res.status(404).send({
        message: "No vehicles found for this user.",
      });
    }
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
