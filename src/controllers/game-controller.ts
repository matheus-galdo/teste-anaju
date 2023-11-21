import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { gameService } from '../services/game-service';

async function postGame(req: Request, res: Response) {
    const { homeTeamName, awayTeamName } = req.body;
    const game = await gameService.postGame(homeTeamName, awayTeamName);
    
    return res.status(httpStatus.CREATED).send(game);
}

async function postGameFinish(req: Request, res: Response) {
    const gameId = req.params.id;
    const { homeTeamScore, awayTeamScore } = req.body;
    const game = await gameService.postGameFinish({
        gameId: Number(gameId),
        homeTeamScore,
        awayTeamScore,
        isFinished: true
    });
    return res.status(httpStatus.OK).send(game);
}

async function getGames(req: Request, res: Response) {
    const games = await gameService.getGames();
    return res.status(httpStatus.OK).send(games);
}

async function getGameById(req: Request, res: Response) {
    const gameId = req.params.id;
    const game = await gameService.getGameById(Number(gameId));
    return res.status(httpStatus.OK).send(game);
}


export const gameController = {
    postGame, postGameFinish,
    getGames, getGameById
}