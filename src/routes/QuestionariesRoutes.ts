import { Router } from 'express';
import controller from '../controllers/QuestionariesController';

const router = Router();

router.get('/', controller.index);
router.get('/:id', controller.get);
router.post('/', controller.store);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);

export default router;
