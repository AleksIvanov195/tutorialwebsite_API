import express from 'express';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
import { validateQuizContentStatus, validateQuizNameDescription, validateQuiz } from '../validators/quizValidator.js';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controllers/Controller.js';
import database from '../database.js';
import QuizModel from '../models/quizModel.js';
import Model from '../models/Model.js';

const model = new Model(QuizModel);
const accessor = new Accessor(model, database);
const controller = new Controller(accessor);

const router = express.Router();

router.get('/myquizzes', authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.get(req, res));
router.get('/:id/questions-answers', (req, res) => controller.get(req, res));
router.get('/:id', (req, res) => controller.get(req, res));
router.get('/', authenticateToken, (req, res) => controller.get(req, res));


router.post('/', authenticateToken, authoriseRoles(['ContentCreator']), validateQuiz, (req, res) => controller.post(req, res));

router.put('/:id/name-description', authenticateToken, authoriseRoles(['ContentCreator']), validateQuizNameDescription, (req, res) => controller.put(req, res));
router.put('/:id/content-status', authenticateToken, authoriseRoles(['ContentCreator']), validateQuizContentStatus, (req, res) => controller.put(req, res));
router.put('/:id', authenticateToken, authoriseRoles(['ContentCreator']), validateQuiz, (req, res) => controller.put(req, res));

router.delete('/:id', authenticateToken, authoriseRoles(['ContentCreator']), (req, res) => controller.delete(req, res));
export default router;
