import app from "../../src/app";
import prisma from "../../src/database";
import httpStatus from "http-status";
import supertest from "supertest";
import { createParticipant } from "../factories/participant-factory";
import { createGame } from "../factories/game-factory";

// beforeEach(async () => {
//     await prisma.participant.deleteMany({});
// });

const server = supertest(app);

describe('Games creation and listing', () => {
    describe('post', () => {
        it('should respond with status 201 if game is created sucessfully', async() => {
            const game = await createGame();
            const response = await server.post('/games').send({
                homeTeamName: game.homeTeamName,
                awayTeamName: game.awayTeamName
            });
            expect(response.status).toBe(httpStatus.CREATED);
        })
        it('should respond with status 400 if no name is passed', async () => {
            const game = await createGame();
            const response = await server.post('/games').send({})
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
        // it('should respond with status 400 if the balance is less than 1000', async () => {
        //     const participant = await createParticipant({ balance: 900 });
        //     const response = await server.post('/participants').send({
        //         name: participant.name,
        //         balance: participant.balance,
        //     });
        //     expect(response.status).toBe(httpStatus.BAD_REQUEST);
        // });
    })

//     describe('get', () => {
//         it('should respond with 200 when get all participants', async() => {
//             const participant = await createParticipant();
//             await server.post('/participants').send({
//                 name: participant.name,
//                 balance: participant.balance,
//             });
//             const response = await server.get('/participants');
//             expect(response.status).toBe(httpStatus.OK);
//         });
//     })
})