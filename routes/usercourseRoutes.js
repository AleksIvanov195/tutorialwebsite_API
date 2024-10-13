import express from 'express';
import { getUserCourses } from '../controllers/usercourseController.js';

const router = express.Router();

router.get('/user/:userID/status/:statusID?', getUserCourses);
router.get('/user/:userID', getUserCourses);
router.get('/:usercourseID', getUserCourses);

export default router;
