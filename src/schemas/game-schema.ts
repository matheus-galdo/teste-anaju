import { Game } from "@prisma/client";
import Joi from "joi";

export const gameSchema = Joi.object<Game>({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required()
})

export const gameFinishSchema = Joi.object<Game>({
    homeTeamScore: Joi.number().required(),
    awayTeamScore: Joi.number().required()
})