import express from 'express';
import { getUserCourses } from '../controllers/usercourseController.js';

const router = express.Router();

// Route to get user courses based on user ID and optional status ID
router.get('/userID/:userId/statusID/:statusId?', getUserCourses); // The statusId is optional
router.get('/userID/:userId', getUserCourses); // Get all user courses for a user

export default router;
