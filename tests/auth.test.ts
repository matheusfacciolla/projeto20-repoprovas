import app from "../src/app.js";
import supertest from "supertest";
import * as authFactory from "./factories/authFactory.js";
import { prisma } from "../src/config/database.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
  await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@gmail.com'`;
});

describe("sign-up tests", () => {
  it("given email password and confirmPassword, create a user", async () => {
    const login = authFactory.createSignUp();
    console.log(login);
    
    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.statusCode).toBe(201);
  });

  it("given email and password already in use, fail to create a user", async () => {
    const login = authFactory.createSignUp();
    await authFactory.createUser(login);
    await supertest(app).post("/sign-up").send(login);

    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.statusCode).toBe(409);
  });

  it("given invalid input, fail to create a user", async () => {
    const login = authFactory.createSignUp();
    delete login.password;
    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.statusCode).toBe(422);
  });
});

describe("sign-in tests", () => {
  it("given valid email and password, receive a token", async () => {
    const login = authFactory.createSignUp();
    delete login.confirmPassword;
    await authFactory.createUser(login);

    const response = await supertest(app).post("/sign-in").send(login);
    const token = response.body.token;
    expect(token).not.toBeNull();
  });

  it("given invalid password, fail to login", async () => {
    const login = authFactory.createSignUp();
    delete login.confirmPassword;
    await authFactory.createUser(login);
    login.password = "differentpassword";

    const response = await supertest(app).post("/sign-in").send(login);
    expect(response.status).toBe(401);
  });

  it("given invalid input, fail to login", async () => {
    const login = authFactory.createSignUp();
    delete login.confirmPassword;
    await authFactory.createUser(login);
    delete login.password;

    const response = await supertest(app).post("/sign-in").send(login);
    expect(response.statusCode).toBe(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
