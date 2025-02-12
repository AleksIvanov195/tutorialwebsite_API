import express from 'express';
import Controller from '../controllers/Controller.js';
import Accessor from '../accessors/Accessor.js';
import { authenticateToken } from '../middleware/auth.js';
import database from '../database.js';
import userCourseModel from '../models/usercourseModel.js';
import Model from '../models/Model.js';

const model = new Model(userCourseModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);
const router = express.Router();

router.get('/users', authenticateToken, (req, res) => controller.get(req, res));
router.get('/:id', (req, res) => controller.get(req, res));
router.get('/', (req, res) => controller.get(req, res));

router.post('/', authenticateToken, (req, res) => controller.post(req, res));

router.put('/:id/complete', authenticateToken, (req, res) => controller.put(req, res));
router.put('/:id', authenticateToken, (req, res) => controller.put(req, res));


router.delete('/:id', authenticateToken, (req, res) => controller.delete(req, res));
export default router;
