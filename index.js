import express from 'express';
import userRoutes from './routes/userRoutes.js';
import userCourseRoutes from './routes/usercourseRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
const app = new express();

app.use(express.json()); // parsing JSON bodies

// Routes

app.use('/users', userRoutes);
app.use('/usercourse', userCourseRoutes);
app.use('/course', courseRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});