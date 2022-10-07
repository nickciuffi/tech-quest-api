import { Router } from 'express';

import controller from '../controllers/UsersController';

const router = Router();

router.get('/', controller.get);
router.get('/login', controller.login);
router.post('/', controller.store);

export default router;
