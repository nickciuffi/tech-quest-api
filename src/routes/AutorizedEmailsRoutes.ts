import { Router } from 'express';

import controller from '../controllers/AutorizedEmailsController';

const router = Router();

router.get('/', controller.index);
router.get('/get', controller.get);
router.delete('/:id', controller.delete);
router.post('/', controller.store);

export default router;
