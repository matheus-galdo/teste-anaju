import { Participant } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from '../../src/database';

export async function createParticipant(params: Partial<Participant> = {}): Promise<Participant> {
    const { name, balance, ...rest } = params;

    return prisma.participant.create({
        data: {
            name: name || faker.person.firstName(),
            balance: balance || faker.number.int({ min: 1000, max: 4294967295 }),
            ...rest,
        },
    });
}

