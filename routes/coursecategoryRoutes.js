import express from 'express';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import coursecategoryModel from '../models/coursecategoryModel.js';
import Model from '../models/Model.js';

const model = new Model(coursecategoryModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/:id', (req, res) => controller.get(req, res));
router.get('/', (req, res) => controller.get(req, res));


export default router;
