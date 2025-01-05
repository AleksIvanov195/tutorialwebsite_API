import express from 'express';
import { validateCourse } from '../validators/courseValidator.js';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import LessonModel from '../models/lessonModel.js';

const accessor = new Accessor(LessonModel, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/', (req, res) => controller.get(req, res));

router.post('/', authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.post(req, res));


export default router;
