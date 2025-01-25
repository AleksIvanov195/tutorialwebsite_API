import express from 'express';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import QuestionModel from '../models/questionModel.js';
import Model from '../models/Model.js';

const model = new Model(QuestionModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/', authenticateToken, (req, res) => controller.get(req, res));

router.post('/', authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.post(req, res));

router.put('/:id', authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.put(req, res));

router.delete('/:id', authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.delete(req, res));
export default router;
