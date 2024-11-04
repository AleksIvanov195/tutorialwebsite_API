import express from 'express';
import { getCourses, createCourse } from '../controllers/courseController.js';
import { validateCourse } from '../validators/courseValidator.js';

const router = express.Router();


router.get('/users/:userID', getCourses);
router.get('/publicationstatus', getCourses);
router.get('/:courseID', getCourses);
router.get('/', getCourses);
router.post('/', validateCourse, createCourse);


export default router;
