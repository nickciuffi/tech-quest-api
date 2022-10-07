import { Router } from 'express';
import controller from '../controllers/QuestionsController';

const router = Router();

router.get('/questionary/:id', controller.getInQuestionary);
router.get('/:id', controller.get);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
