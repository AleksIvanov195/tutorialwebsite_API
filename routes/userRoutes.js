import express from 'express';
import Accessor from '../accessors/Accessor.js';
import userModel from '../models/userModel.js';
import database from '../database.js';
import Controller from '../controllers/Controller.js';


const accessor = new Accessor(userModel, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/:userID', (req, res) => controller.get(req, res));

export default router;