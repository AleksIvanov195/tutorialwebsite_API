import express from 'express';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import { validateCoursecontentPost, validateCoursecontentReorder } from '../validators/coursecontentValidator.js';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import CourseContentModel from '../models/coursecontentModel.js';
import Model from '../models/Model.js';

const model = new Model(CourseContentModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/simplified/user-completion', authenticateToken, (req, res) => controller.get(req, res));
router.get('/simplified', (req, res) => controller.get(req, res));
router.get('/', authenticateToken, (req, res) => controller.get(req, res));

router.post('/', authenticateToken, authoriseRoles(['ContentCreator']), validateCoursecontentPost, (req, res) => controller.post(req, res));

router.put('/:id', authenticateToken, authoriseRoles(['ContentCreator']), validateCoursecontentReorder, (req, res) => controller.put(req, res));

router.delete('/:id', authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.delete(req, res));

export default router;
