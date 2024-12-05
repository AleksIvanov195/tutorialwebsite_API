import express from 'express';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import coursecategoryModel from '../models/coursecategoryModel.js';

const accessor = new Accessor(coursecategoryModel, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/', (req, res) => controller.get(req, res));

export default router;
