import express from 'express';
import { validateCourse } from '../validators/courseValidator.js';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import courseModel from '../models/courseModel.js';
import Model from '../models/Model.js';

const model = new Model(courseModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/users', authenticateToken, (req, res) => controller.get(req, res));
router.get('/publicationstatus', authenticateToken, (req, res) => controller.get(req, res));
router.get('/mycourses', authenticateToken, (req, res) => controller.get(req, res));
router.get('/:id', (req, res) => controller.get(req, res));
router.get('/', (req, res) => controller.get(req, res));


router.post('/', authenticateToken, validateCourse, authoriseRoles(['Admin', 'ContentCreator']), (req, res) => controller.post(req, res));

router.put('/:id', authenticateToken, authoriseRoles(['Admin', 'ContentCreator']), (req, res) => controller.put(req, res));

router.delete('/:id', authenticateToken, authoriseRoles(['Admin', 'ContentCreator']), (req, res) => controller.delete(req, res));
export default router;
