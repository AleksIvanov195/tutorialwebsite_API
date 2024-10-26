import express from 'express';

const router = express.Router();
const API_URL = 'http://localhost:3000/api';

const listOfEndpoints = [
	{
		entity: 'Course',
		sap: '/api/courses',
		services: {
			get:[
				{
					endpoint: '/',
					description: 'Return all courses',
					examples: [`${API_URL}/courses`],
				},
				{
					endpoint: '/:courseID',
					description: 'Return a course by ID',
					examples: [`${API_URL}/courses/1`],
				},
				{
					endpoint: '/users/:userID',
					description: 'Return all courses with a statuses for the specified user',
					examples: [`${API_URL}/courses/user/1`],
				},
			],
			post:{
				endpoint: '/',
				description: 'Insert a new course',
			},
			put:{

			},
			delete:{

			},
		},
	},
	{
		entity: 'UserCourse',
		sap: '/api/usercourses',
		services: {
			get:[
				{
					endpoint: '/users/:userID',
					description: 'Return all usercourses records for a specific user',
					examples: [`${API_URL}/usercourses/users/1`],
				},
				{
					endpoint: '/:usercourseID',
					description: 'Return a usercourse interaction',
					examples: [`${API_URL}/usercourses/777`],
				},
				{
					endpoint: '/users/:userID/status/:statusID?',
					description: 'Return a specific user\'s usercourse records with an optional statusID',
					examples: [
						`${API_URL}/usercourses/users/1`,
						`${API_URL}/usercourses/users/1/status/1`,
					],
				},
			],
			post:{

			},
			put:{

			},
			delete:{

			},
		},
	},
	{
		entity: 'User',
		sap: '/api/users',
		services: {
			get: [
				{
					endpoint: '/:userID',
					description: 'Return a user by ID',
					examples: [`${API_URL}/users/1`],
				},
			],
			post:{

			},
			put:{

			},
			delete:{

			},
		},
	},
];


router.get('/', (req, res) => {
	res.status(200).json({
		message: 'List of available endpoints',
		listOfEndpoints,
	});
});

const defaultRouter = express.Router();

defaultRouter.get('/', (req, res) => {
	res.status(404).json({
		message: 'Specified endpoint not found',
		listOfEndpoints,
	});
});

export { router as domainRouter, defaultRouter };
