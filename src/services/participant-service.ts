import { participantRepository } from '../repositories/participant-repository';
import { Participant } from '@prisma/client';
import { notFoundError, validationError } from '../errors/errors';

export async function postParticipant(name: string, balance: number): Promise<Participant>{
    if (!name) {
        throw validationError("User name is required.");
    }
    if (balance < 1000) {
        throw validationError("Initial balance must be at least R$ 10,00 (1000 cents).");
    }
    const participant = await participantRepository.postParticipant(name, balance);
    return participant;
}

export async function getParticipants(): Promise<Participant[]> {
    const participants = await participantRepository.getParticipants();
    return participants;
}


export const participantService = {
    postParticipant,
    getParticipants
}