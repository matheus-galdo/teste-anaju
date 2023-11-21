import { participantRepository } from '../repositories/participant-repository';
import { Bet } from '@prisma/client';
import { notFoundError, validationError } from '../errors/errors';
import { betRepository } from '../repositories/bet-repository';
import { BetCreationParams } from 'protocols';

async function postBet(params: BetCreationParams): Promise<Bet> {
    const participant = await participantRepository.getParticipantById(params.participantId);
    if (!participant) throw notFoundError();
    const game = await betRepository.getBetById(params.gameId);
    if (!game) throw notFoundError();
    if (participant.balance < params.amountBet) {
        throw validationError('Insufficient balance.');
    }
    const bet = await betRepository.postBet(params);
    const updatedBalance = participant.balance - params.amountBet;
    await participantRepository.updateBalance(params.participantId, updatedBalance);
    return bet;
}

export const betService = { postBet };
