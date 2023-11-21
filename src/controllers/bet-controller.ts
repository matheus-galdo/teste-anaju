import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { betService } from '../services/bet-service';

async function postBet(req: Request, res: Response) {
    const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId, status } = req.body;
    const bet = await betService.postBet({
        homeTeamScore, 
        awayTeamScore, 
        amountBet, 
        gameId, 
        participantId,
        status
    });

    return res.status(httpStatus.CREATED).send(bet);
}

export const betController = { postBet };