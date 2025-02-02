import express from 'express';
import Accessor from '../accessors/Accessor.js';
import userModel from '../models/userModel.js';
import database from '../database.js';
import Controller from '../controllers/Controller.js';
import Model from '../models/Model.js';

const model = new Model(userModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/:id', (req, res) => controller.get(req, res));

export default router;