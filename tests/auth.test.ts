import app from "../src/app.js";
import supertest from "supertest";
import * as authFactory from "./factories/authFactory.js";
import { prisma } from "../src/config/database.js";

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@gmail.com'`;
});

describe("sign-up tests", () => {
  const login = authFactory.createLogin();

  it("given email and password, create user", async () => {
    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.statusCode).toBe(201);
  });

  it("given email and password already in use, fail to create a user", async () => {
    await supertest(app).post("/sign-up").send(login);

    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.statusCode).toBe(409);
  });

  it("given invalid input, fail to create a user", async () => {
    delete login.password;
    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.statusCode).toBe(422);
  });
});

describe("sign-in tests", () => {
  const login = authFactory.createLogin();

  it("given valid email and password, receive a token", async () => {
    const response = await supertest(app).post("/sign-in").send(login);
    const token = response.body.token;
    expect(token).not.toBeNull();
  });

  it("given invalid password, fail to login", async () => {
    const response = await supertest(app)
      .post("/sign-in")
      .send({ ...login, password: "differentpassword" });
    expect(response.status).toBe(401);
  });

  it("given invalid input, fail to login", async () => {
    delete login.password;
    const response = await supertest(app).post("/sign-in").send(login);
    expect(response.statusCode).toBe(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
