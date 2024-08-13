const request = require("supertest");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const userRoutes = require("./userRoutes");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

const prisma = new PrismaClient();

describe("User Routes", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(4000);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  it("should get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a user by ID", async () => {
    const user = await prisma.user.create({
      data: {
        name: "NEW User",
        password: "password",
        email: "email_01_@gmail.com",
        role: "USER",
        address: "SAFi test",
        contact_number: "(627) 517-6218 x443",
        date_of_birth: "1993-06-07T06:23:22.745Z",
      },
    });

    const res = await request(app).get(`/users/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", user.id);
    await prisma.user.delete({ where: { id: user.id } });
  });

  it("should create a new user", async () => {
    const res = await request(app).post("/users").send({
      name: "NEW User",
      password: "password",
      email: "email_1111@gmail.com",
      role: "USER",
      address: "SAFi test",
      contact_number: "(627) 517-6218 x443",
      date_of_birth: "1993-06-07T06:23:22.745Z",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("status", true);
    expect(res.body.user).toHaveProperty("id");

    await prisma.user.delete({ where: { id: res.body.user.id } });
  });

  it("should update a user", async () => {
    const user = await prisma.user.create({
      data: {
        name: "NEW User",
        password: "password",
        email: "email_1112_@gmail.com",
        role: "USER",
        address: "SAFi test",
        contact_number: "(627) 517-6218 x443",
        date_of_birth: "1993-06-07T06:23:22.745Z",
      },
    });

    // Generate a token for the user
    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const res = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${token}`) // Add the token to the request headers
      .send({
        id: user.id,
        name: "Updated User",
        password: "password",
        email: "email1333_@gmail.com",
        role: "USER",
        address: "SAFi test",
        contact_number: "(627) 517-6218 x443",
        date_of_birth: "1993-06-07T06:23:22.745Z",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", true);
    expect(res.body.user).toHaveProperty("name", "Updated User");

    await prisma.user.delete({ where: { id: user.id } });
  });

  it("should delete a user", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Update User",
        password: "password",
        email: "email_0443_@gmail.com",
        role: "USER",
        address: "SAFi test",
        contact_number: "(627) 517-6218 x443",
        date_of_birth: "1993-06-07T06:23:22.745Z",
      },
    });

    // Generate a token for the user
    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const res = await request(app)
      .delete(`/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`); // Add the token to the request headers

    expect(res.statusCode).toEqual(204);

    const deletedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    expect(deletedUser).toBeNull();
  });
});
