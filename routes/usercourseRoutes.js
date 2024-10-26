import express from 'express';
import { getUserCourses } from '../controllers/usercourseController.js';

const router = express.Router();

router.get('/users/:userID/status/:statusID?', getUserCourses);
router.get('/users/:userID', getUserCourses);
router.get('/:usercourseID', getUserCourses);

export default router;
