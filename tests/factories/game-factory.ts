import { Game } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from '../../src/database';

export async function createGame(params: Partial<Game> = {}): Promise<Game> {
    const { homeTeamName, awayTeamName, ...rest } = params;

    return prisma.game.create({
        data: {
            homeTeamName: homeTeamName || faker.internet.displayName(),
            awayTeamName: awayTeamName || faker.internet.displayName(),
            ...rest,
        },
    });
}
