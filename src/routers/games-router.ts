import { gameController } from '../controllers/game-controller';
import { Router } from 'express';
import { validateSchema } from '../middlewares/validate-schema-middleware';
import { gameFinishSchema, gameSchema } from '../schemas/game-schema';

const gameRouter = Router();

gameRouter
    .post('/games', validateSchema(gameSchema), gameController.postGame)
    .post('/games/:id/finish', validateSchema(gameFinishSchema), gameController.postGameFinish)
    .get('/games', gameController.getGames)
    .get('/games/:id', gameController.getGameById);

export { gameRouter };