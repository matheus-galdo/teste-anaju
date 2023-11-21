import app from '../../src/app';
import prisma from '../../src/database';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createParticipant } from '../factories/participant-factory';
import { createBet } from '../factories/bet-factory';
import { createGame } from '../factories/game-factory';

const server = supertest(app);

describe('Bet creation', () => {
  describe('post', () => {
    it('should respond with status 201 if bet is created successfully', async () => {
      const participant = await createParticipant();
      const game = await createGame();

      const bet = await createBet({
        homeTeamScore: 1,
        awayTeamScore: 2,
        amountBet: 100,
        gameId: game.id,
        participantId: participant.id,
      });

      const response = await server.post('/bets').send({
        homeTeamScore: bet.homeTeamScore,
        awayTeamScore: bet.awayTeamScore,
        amountBet: bet.amountBet,
        gameId: game.id,
        participantId: participant.id,
      });

      expect(response.status).toBe(httpStatus.CREATED);
    });

    it('should respond with status 400 if any datatype is not a number', async () => {
      const bet = await createBet();
      const response = await server.post('/bets').send({
        homeTeamScore: bet.homeTeamScore,
        awayTeamScore: bet.awayTeamScore,
        amountBet: bet.amountBet,
        gameId: bet.gameId,
        participantId: '1',
      });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
});
