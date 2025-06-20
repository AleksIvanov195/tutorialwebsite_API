import express from 'express';
import Controller from '../controllers/Controller.js';
import Accessor from '../accessors/Accessor.js';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import { validateCompleteLesson, validateUserlessonPost } from '../validators/userlessonValidator.js';
import database from '../database.js';
import UserlessonModel from '../models/userlessonModel.js';
import Model from '../models/Model.js';
import { checkOwnership } from '../middleware/checkOwnership.js';

const model = new Model(UserlessonModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);
const router = express.Router();

router.get('/users', authenticateToken, (req, res) => controller.get(req, res));
router.get('/', authenticateToken, authoriseRoles(['ContentCreator', 'Admin']), (req, res) => controller.get(req, res));

router.post('/', authenticateToken, validateUserlessonPost, (req, res) => controller.post(req, res));

router.put('/:id/complete', authenticateToken, checkOwnership(model, database), validateCompleteLesson, (req, res) => controller.put(req, res));
// router.put('/:id', authenticateToken, checkOwnership(model, database), (req, res) => controller.put(req, res));

router.delete('/:id', authenticateToken, checkOwnership(model, database), (req, res) => controller.delete(req, res));
export default router;
