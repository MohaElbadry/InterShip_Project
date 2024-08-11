const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seed() {
  try {
    // Delete records in reverse order of dependencies
    await prisma.Claim.deleteMany();
    await prisma.InsurancePolicy.deleteMany();
    await prisma.AccidentVehicle.deleteMany();
    await prisma.Accident.deleteMany();
    await prisma.Vehicle.deleteMany();
    await prisma.User.deleteMany();

    // Create Users
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push(
        await prisma.User.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: await bcrypt.hash(faker.internet.password(), 10),
            role: "client", // Can also be "admin"
            address: faker.location.streetAddress(),
            contact_number: faker.phone.number(),
            date_of_birth: faker.date.birthdate(),
          },
        })
      );
    }

    // Create Admin User
    await prisma.User.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        role: "admin",
        address: faker.location.streetAddress(),
        contact_number: faker.phone.number(),
        date_of_birth: faker.date.birthdate(),
      },
    });

    // Create Vehicles for Users
    const vehicles = [];
    for (let user of users) {
      for (let i = 0; i < 2; i++) {
        vehicles.push(
          await prisma.Vehicle.create({
            data: {
              make: faker.vehicle.manufacturer(),
              model: faker.vehicle.model(),
              year: faker.date.past().getFullYear(),
              license_plate: faker.vehicle.vrm(),
              vin_number: faker.vehicle.vin(),
              user: {
                connect: { id: user.id },
              },
            },
          })
        );
      }
    }

    // Create Accidents for Vehicles
    const accidents = [];
    for (let vehicle of vehicles) {
      for (let i = 0; i < 3; i++) {
        accidents.push(
          await prisma.Accident.create({
            data: {
              date: faker.date.past(),
              location: faker.location.city(),
              description: faker.lorem.sentence(),
            },
          })
        );
      }
    }

    // Create AccidentVehicle relations
    for (let accident of accidents) {
      const accidentVehicles = faker.helpers.arrayElements(
        vehicles,
        faker.number.int({ min: 1, max: 3 })
      );
      for (let vehicle of accidentVehicles) {
        await prisma.AccidentVehicle.create({
          data: {
            accident: {
              connect: { id: accident.id },
            },
            vehicle: {
              connect: { id: vehicle.id },
            },
          },
        });
      }
    }

    // Create Insurance Policies for Users
    for (let user of users) {
      for (let vehicle of vehicles) {
        await prisma.InsurancePolicy.create({
          data: {
            policy_number: faker.string.uuid(),
            type: "auto",
            start_date: faker.date.past(),
            end_date: faker.date.future(),
            amount: faker.number.float({ min: 1000, max: 10000, precision: 2 }),
            status: "active",
            user: {
              connect: { id: user.id },
            },
            vehicle: {
              connect: { id: vehicle.id },
            },
          },
        });
      }
    }

    // Create Claims for Users
    for (let user of users) {
      for (let accident of accidents) {
        await prisma.Claim.create({
          data: {
            claim_number: faker.string.uuid(),
            date_submitted: faker.date.recent(),
            status: "submitted",
            description: faker.lorem.paragraph(),
            amount_claimed: parseFloat(faker.finance.amount()),
            user: {
              connect: { id: user.id },
            },
            accident: {
              connect: { id: accident.id },
            },
          },
        });
      }
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
