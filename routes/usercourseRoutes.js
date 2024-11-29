import express from 'express';
import Controller from '../controllers/Controller.js';
import Accessor from '../accessors/Accessor.js';
import { authenticateToken } from '../middleware/auth.js';
import database from '../database.js';
import UserCourseModel from '../models/usercourseModel.js';

const accessor = new Accessor(UserCourseModel, database);
const controller = new Controller(accessor);
const router = express.Router();

router.get('/users', authenticateToken, (req, res) => controller.get(req, res));
router.get('/:usercourseID', (req, res) => controller.get(req, res));
router.get('/', (req, res) => controller.get(req, res));

export default router;
