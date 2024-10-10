import express from 'express';
import { getUserCourses } from '../controllers/usercourseController.js';

const router = express.Router();

router.get('/userID/:userId/statusID/:statusId?', getUserCourses); // The statusId is optional
router.get('/userID/:userId', getUserCourses); // Get all user courses for a user
router.get('/:usercourseId', getUserCourses); // Get a specific user course via ID

export default router;
