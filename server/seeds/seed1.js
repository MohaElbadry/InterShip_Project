const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create Users
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push(
        await prisma.User.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: await bcrypt.hash("12345678", 10),
            role: "admin", // Can also be "admin"
            address: faker.location.streetAddress(),
            contact_number: faker.phone.number(),
            date_of_birth: faker.date.birthdate(),
          },
        })
      );
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();