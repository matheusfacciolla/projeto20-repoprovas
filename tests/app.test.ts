import app from '../src/app.js';
import supertest from 'supertest';
import  { prisma }  from '../src/config/database.js'

const EMAIL = "matheus@gmail.com";
const PASSWORD = "1234567890";
const login = { email: EMAIL, password: PASSWORD};

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${EMAIL}`;
})

describe("Auth tests", () => {
    it("given email and password, create user", async () => {
        const response = await supertest(app).post("/sign-up").send(login);
        expect(response.statusCode).toBe(201);
    });

    it("given valid email and password, receive a token", async () => {
        const response = await supertest(app).post("/sign-in").send(login);
        const token = response.body.token;
        expect(token).not.toBeNull();
    });

    it("given email and password already in use, fail to create a user", async () => {
        await supertest(app).post("/sign-up").send(login);

        const response = await supertest(app).post("/sign-up").send(login);
        expect(response.statusCode).toBe(409);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});