import express from 'express';
import userRoutes from './routes/userRoutes.js';
import userCourseRoutes from './routes/usercourseRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
const app = new express();

// parsing JSON bodies
app.use(express.json());

// Routes

app.use('/users', userRoutes);
app.use('/usercourses', userCourseRoutes);
app.use('/courses', courseRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});