import app from "../../src/app";
import prisma from "../../src/database";
import httpStatus from "http-status";
import supertest from "supertest";
import { createParticipant } from "../factories/participant-factory";

afterAll(async () => {
    await prisma.participant.deleteMany({});
    await prisma.bet.deleteMany({});
});

const server = supertest(app);

describe('Participants creation and listing', () => {
    describe('post', () => {
        it('should respond with status 201 if participant is created sucessfully', async() => {
            const participant = await createParticipant();
            const response = await server.post('/participants').send({
                name: participant.name, 
                balance: participant.balance
            });
            expect(response.status).toBe(httpStatus.CREATED);
        })
        it('should respond with status 400 if datatype is not number', async () => {
            const participant = await createParticipant();
            const response = await server.post('/participants').send({
                balance: participant.balance,
            });
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
        it('should respond with status 400 if the balance is less than 1000', async () => {
            const participant = { 
                name: 'ana',
                balance: 3
            };
            const response = await server.post('/participants').send({
                name: participant.name,
                balance: participant.balance
            });
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
    })

    describe('get', () => {
        it('should respond with 200 when get all participants', async() => {
            const participant = await createParticipant();
            await server.post('/participants').send({
                name: participant.name,
                balance: participant.balance,
            });
            const response = await server.get('/participants');
            expect(response.status).toBe(httpStatus.OK);
        });
    })
})