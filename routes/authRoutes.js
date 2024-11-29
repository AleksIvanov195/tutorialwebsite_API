import express from 'express';
import Accessor from '../accessors/Accessor.js';
import AuthController from '../controllers/authController.js';
import database from '../database.js';
import userModel from '../models/userModel.js';
const accessor = new Accessor(userModel, database);
const controller = new AuthController(accessor);

const router = express.Router();

router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.post('/refresh', (req, res) => controller.refresh(req, res));

export default router;