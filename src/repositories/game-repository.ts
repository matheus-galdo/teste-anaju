import { PrismaClient, Game } from '@prisma/client';
import { GameFinishParams } from 'protocols';

const prisma = new PrismaClient();

async function postGame (homeTeamName: string, awayTeamName: string): Promise<Game>{
    const game = await prisma.game.create({
        data: {
            homeTeamName,
            awayTeamName
        }
    });
    return game;
}

async function findTeamByName (teamName: string) {
    const game = await prisma.game.findFirst({
        where: {
            OR: [
                {
                    homeTeamName: teamName
                },
                {
                    awayTeamName: teamName
                }
            ]
        }
    });
    return game;
}

async function getGames(): Promise<Game[]> {
    const games = await prisma.game.findMany();
    return games;
}

async function postGameFinish(params: GameFinishParams): Promise<Game> {
    const game = await prisma.game.update({
        where: {
            id: params.gameId
        },
        data: {
            homeTeamScore: params.homeTeamScore,
            awayTeamScore: params.awayTeamScore,
            isFinished: params.isFinished
        }
    });
    return game;
}

async function getGameById(id: number) {
    const game = await prisma.game.findFirst({
        where: {
            id: id,
        }
    });
    return game;
}

export const gameRepository = {
    postGame, getGames,
    findTeamByName,
    postGameFinish, getGameById
}