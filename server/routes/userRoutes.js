var express = require("express");
var router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userModel = require("../models/user");

// Get all users
router.get("/", async (req, res) => {
  const { take, skip } = req.query;
  try {
    const users = await userModel.getAllUsers(take, skip);
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get user By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id); // Corrected variable name to 'user'
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await userModel.createUser(req.body);
    res.send({
      status: true,
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a user
router.patch("/", async (req, res) => {
  try {
    const updatedUser = await userModel.updateUser(req.body.id, req.body);
    res.send({
      status: true,
      message: "User Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
});

// Delete a user
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id);
    res.send({
      status: true,
      message: "User Deleted Successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
});

module.exports = router;
