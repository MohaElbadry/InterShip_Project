const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seed() {
    try {
        // Delete existing records
        await prisma.Claim.deleteMany();
        await prisma.InsurancePolicy.deleteMany();


        console.log("Deleted existing records.");

        // Create a single user
        const user = await prisma.User.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: await bcrypt.hash(faker.internet.password(), 10),
                role: "client",
                address: faker.location.streetAddress(),
                contact_number: faker.phone.number(),
                date_of_birth: faker.date.birthdate(),
            },
        });
        console.log(`Created user: ${user.email}`);

        // Create a single vehicle
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
        console.log(`Created vehicle: ${vehicle.license_plate}`);

        // Generate policies and claims grouped by day
        const numberOfDays = 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - numberOfDays);

        for (let i = 0; i < numberOfDays; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i);

            const numberOfPolicies = faker.number.int({ min: 0, max: 10 });
            const numberOfClaims = faker.number.int({ min: 0, max: 8 });

            // Create policies for the current day
            for (let j = 0; j < numberOfPolicies; j++) {
                const policy = await prisma.InsurancePolicy.create({
                    data: {
                        policy_number: faker.string.uuid(),
                        type: "auto",
                        start_date: currentDate,
                        end_date: faker.date.future({ refDate: currentDate }),
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
                console.log(`Created policy ${policy.policy_number} on ${currentDate.toISOString().split('T')[0]}`);
            }
            const accident = await prisma.Accident.create({
                data: {
                    date: faker.date.past(),
                    location: faker.location.city(),
                    description: faker.lorem.sentence(),
                },
            });
            // Create claims for the current day
            for (let k = 0; k < numberOfClaims; k++) {
                const claim = await prisma.Claim.create({
                    data: {
                        claim_number: faker.string.uuid(),
                        date_submitted: currentDate,
                        status: "submitted",
                        description: faker.lorem.sentence(),
                        amount_claimed: parseFloat(faker.finance.amount()),
                        user: {
                            connect: { id: user.id },
                        },
                        accident: {
                            connect: { id: accident.id }, // Randomly connect to an accident
                        },
                    },
                });
                console.log(`Created claim ${claim.claim_number} on ${currentDate.toISOString().split('T')[0]}`);
            }

            console.log(`Day ${i + 1}: Created ${numberOfPolicies} policies and ${numberOfClaims} claims`);
        }

        console.log("Seeding completed successfully!");
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();