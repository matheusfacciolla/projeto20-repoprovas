import app from "../src/app.js";
import supertest from "supertest";
import * as authFactory from "./factories/authFactory.js";
import * as testsFactory from "./factories/testsFactory.js";
import { prisma } from "../src/config/database.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests`;
  await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@gmail.com'`;
});

describe("sign-up tests", () => {
  it("given email password and confirmPassword, create a user", async () => {
    const login = authFactory.createSignUp();

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

describe("insert new test tests", () => {
  const validInput = testsFactory.validInput();
  const invalidInput = testsFactory.invalidInput();
  const invalidToken = testsFactory.invalidToken();

  it("no token found, fail to authenticate", async () => {
    const response = await supertest(app).post("/createtest").send(validInput);
    expect(response.statusCode).toBe(401);
  });

  it("invalid token found, fail to authenticate", async () => {
    const response = await supertest(app)
      .post("/createtest")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(validInput);
    expect(response.statusCode).toBe(401);
  });

  it("valid input and token, create new test", async () => {
    const login = authFactory.createSignUp();
    await authFactory.createUser(login);
    delete login.confirmPassword;

    const responseLogin = await supertest(app).post("/sign-in").send(login);
    const token = responseLogin.body.token;

    const response = await supertest(app)
      .post("/createtest")
      .set("Authorization", `Bearer ${token}`)
      .send(validInput);
    expect(response.statusCode).toBe(201);
  });

  it("invalid input, fail to create new test", async () => {
    const login = authFactory.createSignUp();
    await authFactory.createUser(login);
    delete login.confirmPassword;

    const responseLogin = await supertest(app).post("/sign-in").send(login);
    const token = responseLogin.body.token;

    const response = await supertest(app)
      .post("/createtest")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidInput);
    expect(response.statusCode).toBe(422);
  });
});

describe("get tests by disciplines tests", () => {
  const invalidToken = testsFactory.invalidToken();

  it("no token found, fail to authenticate", async () => {
    const response = await supertest(app).get("/testsbydisciplines");
    expect(response.statusCode).toBe(401);
  });

  it("invalid token found, fail to authenticate", async () => {
    const response = await supertest(app)
      .get("/testsbydisciplines")
      .set("Authorization", `Bearer ${invalidToken}`);
    expect(response.statusCode).toBe(401);
  });

  it("valid token, receive tests by discipline", async () => {
    const login = authFactory.createSignUp();
    await authFactory.createUser(login);
    delete login.confirmPassword;

    const responseLogin = await supertest(app).post("/sign-in").send(login);
    const token = responseLogin.body.token;

    const response = await supertest(app)
      .get("/testsbydisciplines")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});

describe("get tests by teachers tests", () => {
  const invalidToken = testsFactory.invalidToken();

  it("no token found, fail to authenticate", async () => {
    const response = await supertest(app).get("/testsbyteachers");
    expect(response.statusCode).toBe(401);
  });

  it("invalid token found, fail to authenticate", async () => {
    const response = await supertest(app)
      .get("/testsbyteachers")
      .set("Authorization", `Bearer ${invalidToken}`);
    expect(response.statusCode).toBe(401);
  });

  it("valid token, receive tests by teachers", async () => {
    const login = authFactory.createSignUp();
    await authFactory.createUser(login);
    delete login.confirmPassword;

    const responseLogin = await supertest(app).post("/sign-in").send(login);
    const token = responseLogin.body.token;

    const response = await supertest(app)
      .get("/testsbyteachers")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
