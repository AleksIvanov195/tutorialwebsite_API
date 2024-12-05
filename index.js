import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import userCourseRoutes from './routes/usercourseRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import coursecategoryRoutes from './routes/coursecategoryRoutes.js'
import { domainRouter, defaultRouter } from './routes/defaultRouter.js';

dotenv.config();
const app = express();


const allowedDomains = process.env.ALLOWED_DOMAINS.split(',');


app.use(cors({
	origin: allowedDomains,
	methods: 'GET,POST,PUT,DELETE',
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// parsing JSON bodies
app.use(express.json());

// Routes
app.use('/api/users', authRoutes);
app.use('/api/usercourses', userCourseRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/coursecategory', coursecategoryRoutes)
app.use('/api/', domainRouter);
app.use('/api/*', defaultRouter);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
