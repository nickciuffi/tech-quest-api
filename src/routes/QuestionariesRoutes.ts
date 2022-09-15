import { Router } from 'express';
import controller from '../controllers/QuestionariesController';

const router = Router();

router.get('/', controller.index);
router.get('/:id', controller.get);
router.post('/', controller.store);

export default router;
