import { PrismaClient, Participant } from '@prisma/client';

const prisma = new PrismaClient();

async function postParticipant(name: string, balance: number): Promise<Participant> {
    const participant = await prisma.participant.create({
        data: {
            name,
            balance,
        },
    });
    return participant;
}

async function getParticipants(): Promise<Participant[]> {
    const participants = await prisma.participant.findMany();
    return participants;
}

// async function getParticipantByName(name: string): Promise<Participant> {
//     const participant = await prisma.participant.findUnique({
//         where: {
//             name: name,
//         },
//     });
//     return participant;
// }

async function getParticipantById(id: number): Promise<Participant> {
    const participant = await prisma.participant.findUnique({
        where: {
            id: id,
        },
    });
    return participant;
}

async function updateBalance(participantId: number, newBalance: number): Promise<Participant> {
    const updatedParticipant = await prisma.participant.update({
        where: {
            id: participantId,
        },
        data: {
            balance: newBalance,
        },
    });
    return updatedParticipant;
}

export const participantRepository = {
    postParticipant,
    getParticipants,
    getParticipantById,
    updateBalance
}