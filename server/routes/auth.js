const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      address,
      contact_number,
      date_of_birth,
    } = req.body;
    // Validate user input
    if (!(name && email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user with hashed password
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: "USER", // Default role
        address,
        contact_number,
        date_of_birth,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { user_id: newUser.id, email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Return user data and token
    return res.status(201).json({
      status: true,
      user: {
        id: newUser.id,
        nom: newUser.nom,
        email: newUser.email,
        role: newUser.role,
      },
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

// Signin Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    // Check if user exists
    const user = await prisma.User.findUnique({
      where: { email },
    });

    // Validate password and generate token
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Optional: Set token expiration
      );
      return res.status(200).json({
        status: true,
        user: {
          id: user.id,
          nom: user.nom,
          email: user.email,
          role: user.role,
        },
        token: token,
      });
    }

    return res.status(400).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  } finally {
    prisma.$disconnect();
  }
});

module.exports = router;
