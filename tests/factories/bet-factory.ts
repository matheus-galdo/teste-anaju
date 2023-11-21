import { Bet } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from '../../src/database';

export async function createBet(params: Partial<Bet> = {}): Promise<Bet> {
    const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId, ...rest } = params;

    return prisma.bet.create({
        data: {
            homeTeamScore: homeTeamScore || faker.datatype.number(),
            awayTeamScore: awayTeamScore || faker.datatype.number(), 
            amountBet: amountBet || faker.datatype.number(), 
            gameId: gameId || faker.datatype.number(), 
            participantId: participantId || faker.datatype.number(),
            status: 'PENDING',
            ...rest,
        },
    });
}

