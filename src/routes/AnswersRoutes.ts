import { Router } from 'express';
import controller from '../controllers/AnswersController';

const router = Router();

router.get('/question/:id', controller.getInQuestion);
router.get('/:id', controller.get);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
