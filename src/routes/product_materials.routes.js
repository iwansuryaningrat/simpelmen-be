import {
    createMaterial,
    findAllMaterial,
    findOneMaterial,
    updateMaterial,
    removeMaterial,
} from '../controllers/product/product_materials.controllers.js';

import { isLogin } from '../middlewares/auth.middlewares.js';
import { isSuperAdmin } from '../middlewares/roles.middlewares.js';

import express from 'express';
const router = express.Router();

import headers from '../services/headers.services.js';

const productMaterialsRoutes = (app) => {
    app.use(headers);

    router.post('/', isLogin, isSuperAdmin, createMaterial);
    router.get('/', isLogin, isSuperAdmin, findAllMaterial);
    router.get('/:id', isLogin, isSuperAdmin, findOneMaterial);
    router.put('/:id', isLogin, isSuperAdmin, updateMaterial);
    router.delete('/:id', isLogin, isSuperAdmin, removeMaterial);

    app.use('/api/material', router);
}

export default productMaterialsRoutes;