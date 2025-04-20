import express from 'express';
import Controller from '../controllers/Controller.js';
import Accessor from '../accessors/Accessor.js';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import { validateUsercontentstatus } from '../validators/usercontentstatusValidator.js';
import database from '../database.js';
import UsercontentstatusModel from '../models/usercontentstatusModel.js';
import Model from '../models/Model.js';

const model = new Model(UsercontentstatusModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);
const router = express.Router();


router.get('/', authenticateToken, (req, res) => controller.get(req, res));

router.post('/', authenticateToken, authoriseRoles(['Admin']), validateUsercontentstatus, (req, res) => controller.post(req, res));

router.put('/:id', authenticateToken, authoriseRoles(['Admin']), validateUsercontentstatus, (req, res) => controller.put(req, res));

router.delete('/:id', authenticateToken, authoriseRoles(['Admin']), (req, res) => controller.delete(req, res));

export default router;
