import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userCourseRoutes from './routes/usercourseRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import coursecategoryRoutes from './routes/coursecategoryRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import answerRoutes from './routes/answerRoutes.js';
import coursecontentRoutes from './routes/coursecontentRoutes.js';
import userbookmarkRoutes from './routes/userbookmarkRoutes.js';
import usercontentstatusRoutes from './routes/usercontentstatusRoutes.js';

import { domainRouter, defaultRouter } from './routes/defaultRouter.js';

dotenv.config();
const app = express();


const allowedDomains = process.env.ALLOWED_DOMAINS.split(',');

app.use(cors({
	origin: function(origin, callback) {
		// Allow same-origin requests
		if (!origin || allowedDomains.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: 'GET, POST, PUT, DELETE',
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(cookieParser());

// parsing JSON bodies
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/usercourses', userCourseRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/coursecategories', coursecategoryRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/coursecontents', coursecontentRoutes);
app.use('/api/userbookmarks', userbookmarkRoutes);
app.use('/api/usercontentstatus', usercontentstatusRoutes);
app.use('/api/', domainRouter);
app.use('/api/*', defaultRouter);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
