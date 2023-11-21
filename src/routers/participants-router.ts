import { participantController } from '../controllers/participant-controller';
import { Router } from 'express';
import { validateSchema } from '../middlewares/validate-schema-middleware';
import { participantSchema } from '../schemas/participant-schema';

const participantRouter = Router();

participantRouter
    .post('/participants', validateSchema(participantSchema), participantController.postParticipant)
    .get('/participants', participantController.getParticipants);

export { participantRouter };