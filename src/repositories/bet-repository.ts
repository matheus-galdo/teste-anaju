import { PrismaClient, Bet } from '@prisma/client';
import { BetCreationParams } from 'protocols';

const prisma = new PrismaClient();

async function postBet(params: BetCreationParams): Promise<Bet> {
    const bet = await prisma.bet.create({
        data: {
            homeTeamScore: params.homeTeamScore,
            awayTeamScore: params.awayTeamScore,
            amountBet: params.amountBet,
            gameId: params.gameId,
            participantId: params.participantId,
            status: 'PENDING'
        },
    });
    return bet;
}

async function getBetById(id: number): Promise<Bet | null> {
    const bet = await prisma.bet.findUnique({
        where: {
            id: id,
        },
    });
    return bet;
}

async function getBetsByGameId(gameId: number): Promise<Bet[]> {
    return prisma.bet.findMany({
        where: {
            gameId: gameId,
        },
    });
}

async function updateBetStatusAndAmount(betId: number, status: string, amountWon: number): Promise<void> {
    await prisma.bet.update({
        where: {
            id: betId,
        },
        data: {
            status: status,
            amountWon: amountWon,
        },
    });
}

export const betRepository = {
    postBet,
    getBetById,
    getBetsByGameId,
    updateBetStatusAndAmount
};
