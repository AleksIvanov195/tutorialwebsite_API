import express from 'express';
import { getUserCourses } from '../controllers/usercourseController.js';

const router = express.Router();

// Return a specific user's usercourse interactions with a optional statusID
router.get('/user/:userID/status/:statusID?', getUserCourses);
// Return all usercourses interactions for a specific user
router.get('/user/:userID', getUserCourses);
// Return a usercourse interaction
router.get('/:usercourseID', getUserCourses);

export default router;
