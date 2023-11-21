import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { participantService } from '../services/participant-service';

async function postParticipant(req: Request, res: Response) {
    const { name, balance } = req.body;
    const participant = await participantService.postParticipant(name, balance);
    
    return res.status(httpStatus.CREATED).send(participant);
}

async function getParticipants(req: Request, res: Response) {
    const participants = await participantService.getParticipants();
    return res.status(httpStatus.OK).send(participants);
}


export const participantController = {
    postParticipant, getParticipants
}