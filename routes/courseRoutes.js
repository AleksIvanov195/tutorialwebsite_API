import express from 'express';
import { getCourses } from '../controllers/courseController.js';

const router = express.Router();


// Return all courses with a status for the specified user
router.get('/user/:userID/statuses', getCourses);
// Return a course by ID
router.get('/:courseID', getCourses);
// Return all courses
router.get('/', getCourses);


export default router;
