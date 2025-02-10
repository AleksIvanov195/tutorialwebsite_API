import express from 'express';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import CourseContentModel from '../models/coursecontentModel.js';
import Model from '../models/Model.js';

const model = new Model(CourseContentModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/simplified', authenticateToken, (req, res) => controller.get(req, res));
router.get('/', authenticateToken, (req, res) => controller.get(req, res));

export default router;
