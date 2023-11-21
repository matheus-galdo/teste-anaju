import { gameRepository } from '../repositories/game-repository';
import { Game } from '@prisma/client';
import { notFoundError, validationError } from '../errors/errors';
import { betRepository } from '../repositories/bet-repository';
import { participantRepository } from '../repositories/participant-repository';
import { GameFinishParams } from 'protocols';

export async function postGame (homeTeamName: string, awayTeamName: string): Promise<Game>{
    if (!homeTeamName || !awayTeamName) {
        throw validationError("Team name is required.");
    }
    const game = await gameRepository.postGame(homeTeamName, awayTeamName);
    return game;

}

export async function getGames (): Promise<Game[]> {
    const games = await gameRepository.getGames();
    return games;
}

export async function postGameFinish (params: GameFinishParams) {
    const existingGame = await gameRepository.getGameById(params.gameId);
    if (!existingGame) throw notFoundError();
    if (existingGame.isFinished) throw validationError("The game is already finished.");
    await gameRepository.postGameFinish(params);
    const bets = await betRepository.getBetsByGameId(params.gameId);
    const totalWinningAmount = bets
        .filter((bet) => bet.homeTeamScore === params.homeTeamScore && bet.awayTeamScore === params.awayTeamScore)
        .reduce((acc, bet) => acc + bet.amountBet, 0);
    for (const bet of bets) {
        if (bet.homeTeamScore === params.homeTeamScore && bet.awayTeamScore === params.awayTeamScore) {
            const amountWon = calculateAmountWon(bet.amountBet, totalWinningAmount);
            await betRepository.updateBetStatusAndAmount(bet.id, 'WON', amountWon);
            
            const participant = await participantRepository.getParticipantById(bet.participantId);
            if (participant) {
                await participantRepository.updateBalance(participant.id, participant.balance + amountWon);
            }
        } else {
            await betRepository.updateBetStatusAndAmount(bet.id, 'LOST', 0);
        }
    }
    const updatedGame = await gameRepository.postGameFinish(params);
    return updatedGame;
}

// TOFIX
export async function getGameById (gameId: number) {
    const game = await gameRepository.getGameById(gameId);
    if (!game) {
        throw notFoundError();
    }
    const bets = await betRepository.getBetById(gameId);
    const gameWithBets = {
        id: game.id,
        createdAt: game.createdAt.toISOString(),
        updatedAt: game.updatedAt.toISOString(),
        homeTeamName: game.homeTeamName,
        awayTeamName: game.awayTeamName,
        homeTeamScore: game.homeTeamScore,
        awayTeamScore: game.awayTeamScore,
        isFinished: game.isFinished,
        bets: {
            id: bets.id,
            createdAt: bets.createdAt.toISOString(),
            updatedAt: bets.updatedAt.toISOString(),
            homeTeamScore: bets.homeTeamScore,
            awayTeamScore: bets.awayTeamScore,
            amountBets: bets.amountBet,
            gameId: bets.gameId,
            participantId: bets.participantId,
            status: bets.status,
            amountWon: bets.amountWon || null,
        },
    };
    
    return gameWithBets;
}

function calculateAmountWon(amountBet: number, totalWinningAmount: number): number {
    const houseFee = 0.3; 
    const winningRatio = amountBet / totalWinningAmount;
    const totalAmountWon = winningRatio * totalWinningAmount * (1 - houseFee);
    return Math.floor(totalAmountWon);
}


export const gameService = {
    postGame, getGames,
    postGameFinish, getGameById
}