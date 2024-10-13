import express from 'express';
import userRoutes from './routes/userRoutes.js';
import userCourseRoutes from './routes/usercourseRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import { domainRouter, defaultRouter } from './routes/defaultRouter.js';
const app = new express();

// parsing JSON bodies
app.use(express.json());

// Routes

app.use('/api/users', userRoutes);
app.use('/api/usercourses', userCourseRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/', domainRouter);
app.use('/api/*', defaultRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});