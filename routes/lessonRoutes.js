import express from 'express';
import { validateLessonContentStatus, validateLessonNameDescription, validateLesson } from '../validators/lessonValidator.js';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import LessonModel from '../models/lessonModel.js';
import Model from '../models/Model.js';

const model = new Model(LessonModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/mylessons', authenticateToken, (req, res) => controller.get(req, res));
router.get('/:id', authenticateToken, (req, res) => controller.get(req, res));
router.get('/', authenticateToken, (req, res) => controller.get(req, res));


router.post('/', validateLesson, authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.post(req, res));

router.put('/:id/name-description', validateLessonNameDescription, authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.put(req, res));
router.put('/:id/content-status', validateLessonContentStatus, authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.put(req, res));
router.put('/:id', validateLesson, authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.put(req, res));

router.delete('/:id', authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.delete(req, res));

export default router;
