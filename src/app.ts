import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { participantRouter } from './routers/participants-router';
import { gameRouter } from './routers/games-router';
import { betRouter } from './routers/bets-router';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get('/health', (_req: Request, res: Response) => res.send('OK!'))
    .use(participantRouter)
    .use(gameRouter)
    .use(betRouter)
    .use(handleApplicationErrors)

export default app;