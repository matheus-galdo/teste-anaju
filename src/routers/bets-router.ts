import { betController } from '../controllers/bet-controller';
import { Router } from 'express';
import { validateSchema } from '../middlewares/validate-schema-middleware';
import { betSchema } from '../schemas/bet-schema';

const betRouter = Router();

betRouter.post('/bets', validateSchema(betSchema), betController.postBet);

export { betRouter };