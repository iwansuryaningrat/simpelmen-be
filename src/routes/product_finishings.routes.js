import {
    createFinishing,
    findAllFinishing,
    findOneFinishing,
    updateFinishing,
    removeFinishing,
} from '../controllers/product/product_finishings.controllers.js';

import { isLogin } from '../middlewares/auth.middlewares.js';
import { isSuperAdmin } from '../middlewares/roles.middlewares.js';

import express from 'express';
const router = express.Router();

import headers from '../services/headers.services.js';

const productFinishingsRoutes = (app) => {
    app.use(headers);

    router.post('/', isLogin, isSuperAdmin, createFinishing);
    router.get('/', isLogin, isSuperAdmin, findAllFinishing);
    router.get('/:id', isLogin, isSuperAdmin, findOneFinishing);
    router.put('/:id', isLogin, isSuperAdmin, updateFinishing);
    router.delete('/:id', isLogin, isSuperAdmin, removeFinishing);

    app.use('/api/finishing', router);
}

export default productFinishingsRoutes;