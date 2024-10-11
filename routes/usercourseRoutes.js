import express from 'express';
import { getUserCourses } from '../controllers/usercourseController.js';

const router = express.Router();

router.get('/userID/:userId/statusID/:statusId?', getUserCourses); // Get a user course record for a user with a specific status
router.get('/userID/:userId', getUserCourses); // Get all user courses records for a user
router.get('/:usercourseId', getUserCourses); // Get a specific user course via ID

export default router;
