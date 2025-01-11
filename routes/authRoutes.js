import express from 'express';
import Accessor from '../accessors/Accessor.js';
import AuthController from '../controllers/authController.js';
import database from '../database.js';
import userModel from '../models/userModel.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';
import { authenticateRefreshToken } from '../middleware/auth.js';
import Model from '../models/Model.js';

const model = new Model(userModel);
const accessor = new Accessor(model, database);
const controller = new AuthController(accessor);

const router = express.Router();

router.post('/register', validateRegister, (req, res) => controller.register(req, res));
router.post('/login', validateLogin, (req, res) => controller.login(req, res));
router.post('/refresh', (req, res) => controller.refresh(req, res));
router.post('/logout', (req, res) => controller.logout(req, res));
router.post('/checkAuth', authenticateRefreshToken, (req, res) => controller.checkAuth(req, res));



export default router;