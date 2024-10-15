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

    console.log("Deleted existing records.");

    // Create Users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = await prisma.User.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: await bcrypt.hash(faker.internet.password(), 10),
          role: "client", // Can also be "admin"
          address: faker.location.streetAddress(),
          contact_number: faker.phone.number(),
          date_of_birth: faker.date.birthdate(),
        },
      });
      users.push(user);
      console.log(`Created user: ${user.email}`);
    }

    // Create Admin Users
    for (let i = 0; i < 2; i++) {
      const adminUser = await prisma.User.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: await bcrypt.hash("adminPassword", 10), // Use a fixed password for admin
          role: "admin",
          address: faker.location.streetAddress(),
          contact_number: faker.phone.number(),
          date_of_birth: faker.date.birthdate(),
        },
      });
      console.log(`Created admin user: ${adminUser.email}`);
    }

    // Create Vehicles for Users
    const vehicles = [];
    for (let user of users) {
      for (let i = 0; i < 2; i++) {
        const vehicle = await prisma.Vehicle.create({
          data: {
            make: faker.vehicle.manufacturer(),
            model: faker.vehicle.model(),
            year: faker.date.past().getFullYear(),
            license_plate: faker.vehicle.vrm(),
            vin_number: faker.vehicle.vin(),
            picture_url: "/uploads/none.jpg",
            user: {
              connect: { id: user.id },
            },
          },
        });
        vehicles.push(vehicle);
        console.log(`Created vehicle for user ${user.email}: ${vehicle.license_plate}`);
      }
    }

    // Create Accidents for Vehicles
    const accidents = [];
    for (let vehicle of vehicles) {
      for (let i = 0; i < 3; i++) {
        const accident = await prisma.Accident.create({
          data: {
            date: faker.date.past(),
            location: faker.location.city(),
            description: faker.lorem.sentence(),
          },
        });
        accidents.push(accident);
        console.log(`Created accident for vehicle ${vehicle.license_plate}: ${accident.description}`);
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
        console.log(`Linked vehicle ${vehicle.license_plate} to accident.`);
      }
    }

    // Create Insurance Policies and Claims on the Same Days
    for (let user of users) {
      for (let vehicle of vehicles) {
        const startDate = faker.date.recent();
        const policy = await prisma.InsurancePolicy.create({
          data: {
            policy_number: faker.string.uuid(),
            type: "auto",
            start_date: startDate,
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
        console.log(`Created policy ${policy.policy_number} for user ${user.email} and vehicle ${vehicle.license_plate}`);

        // Create a claim on the same day as the policy
        await prisma.Claim.create({
          data: {
            claim_number: faker.string.uuid(),
            date_submitted: startDate,
            status: "submitted",
            description: faker.lorem.sentence(),
            amount_claimed: parseFloat(faker.finance.amount()),
            user: {
              connect: { id: user.id },
            },
            accident: {
              connect: { id: accidents[Math.floor(Math.random() * accidents.length)].id }, // Randomly connect to an accident
            },
          },
        });
        console.log(`Created claim for policy ${policy.policy_number} on ${startDate}`);
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
