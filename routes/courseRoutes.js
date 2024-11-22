import express from 'express';
import { validateCourse } from '../validators/courseValidator.js';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import courseModel from '../models/courseModel.js';

const accessor = new Accessor(courseModel, database);
const controller = new Controller(accessor);

const router = express.Router();


router.get('/users/:userID', (req, res) => controller.get(req, res));
router.get('/publicationstatus', (req, res) => controller.get(req, res));
router.get('/:courseID', (req, res) => controller.get(req, res));
router.get('/', (req, res) => controller.get(req, res));


router.post('/', validateCourse, (req, res) => controller.post(req, res));


export default router;
