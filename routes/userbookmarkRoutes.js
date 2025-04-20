import express from 'express';
import Controller from '../controllers/Controller.js';
import Accessor from '../accessors/Accessor.js';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import { validateUserbookmark } from '../validators/userbookmarkValidator.js';
import database from '../database.js';
import UserbookmarkModel from '../models/userbookmarkModel.js';
import Model from '../models/Model.js';
import { checkOwnership } from '../middleware/checkOwnership.js';

const model = new Model(UserbookmarkModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);
const router = express.Router();


router.get('/', authenticateToken, authoriseRoles(['Admin']), (req, res) => controller.get(req, res));

router.post('/', authenticateToken, validateUserbookmark, (req, res) => controller.post(req, res));

router.delete('/:id', authenticateToken, checkOwnership(model, database), (req, res) => controller.delete(req, res));

export default router;
