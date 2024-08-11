const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function getAllUsers(take, skip) {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
}

async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function createUser(data) {
  const {
    name,
    email,
    password,
    role,
    address,
    contact_number,
    date_of_birth,
  } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
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
}

async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data,
  });
}

async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
