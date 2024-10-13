import express from 'express';
import { getCourses, createCourse } from '../controllers/courseController.js';

const router = express.Router();


router.get('/user/:userID/statuses', getCourses);
router.get('/:courseID', getCourses);
router.get('/', getCourses);
router.post('/', createCourse);


export default router;
