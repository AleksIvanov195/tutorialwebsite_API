import express from 'express';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import { validateCoursecategory } from '../validators/coursecategoryValidator.js';
import database from '../database.js';
import coursecategoryModel from '../models/coursecategoryModel.js';
import Model from '../models/Model.js';

const model = new Model(coursecategoryModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/:id', (req, res) => controller.get(req, res));
router.get('/', (req, res) => controller.get(req, res));

router.post('/', authenticateToken, authoriseRoles(['Admin', 'ContentCreator']), validateCoursecategory, (req, res) => controller.post(req, res));

router.put('/:id', authenticateToken, authoriseRoles(['Admin', 'ContentCreator']), validateCoursecategory, (req, res) => controller.put(req, res));

router.delete('/:id', authenticateToken, authoriseRoles(['Admin', 'ContentCreator']), (req, res) => controller.delete(req, res));


export default router;
