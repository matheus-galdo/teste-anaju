import { Participant } from "@prisma/client";
import Joi from "joi";

export const participantSchema = Joi.object<Participant>({
    name: Joi.string().required(),
    balance: Joi.number().required().min(1000).max(4294967295),
});