import express from 'express';
import Controller from '../controllers/Controller.js';
import Accessor from '../accessors/Accessor.js';
import { authenticateToken } from '../middleware/auth.js';
import database from '../database.js';
import UsercontentstatusModel from '../models/usercontentstatusModel.js';
import Model from '../models/Model.js';

const model = new Model(UsercontentstatusModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);
const router = express.Router();


router.get('/', authenticateToken, (req, res) => controller.get(req, res));

export default router;
