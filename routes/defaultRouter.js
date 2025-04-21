import express from 'express';
import { authenticateToken, authoriseRoles } from '../middleware/auth.js';
/**
 * Common Query Parameters Available for Most Endpoints available to chnage in modelutils.js file.
 *
 * The API supports the following query parameters for filtering and pagination:
 *
 * Filtering:
 * - Any field listed in allowedFields for an endpoint can be used as a filter
 *   Example: ?Name=Introduction&Status=Inprogress
 * - Multiple values can be provided using comma separation
 *   Example: ?Status=Inprogress,Completed
 *
 * Search:
 * - search: Search term to find across searchable fields
 *   Example: ?search=javascript
 * - searchFields: Comma-separated list of fields to search in (must be in allowedFields)
 *   Example: ?search=javascript&searchFields=CourseName,CourseDescription
 *
 * Sorting:
 * - orderby: Field to sort by, optionally followed by sort direction
 *   Example: ?orderby=Name,DESC
 *
 * Pagination:
 * - limit: Number of records to return
 *   Example: ?limit=10
 * - page: Page number based on limit
 *   Example: ?limit=10&page=2
 * - offset: Direct offset value (alternative to page)
 *   Example: ?limit=10&offset=20
 */

const router = express.Router();
const API_URL = 'http://localhost:3000/api';
// const API_URL = 'http://51.75.162.46/api';

const commonQueryParameters = {
	title: 'Common Query Parameters',
	description: 'The following query parameters are available for most endpoints:',
	parameters: [
		{
			category: 'Filtering',
			items: [
				{
					description: 'Any field listed in allowedFields for an endpoint can be used as a filter',
					example: '?Name=Introduction&Status=Inprogress',
				},
				{
					description: 'Multiple values can be provided using comma separation',
					example: '?Status=Inprogress,Completed',
				},
			],
		},
		{
			category: 'Search',
			items: [
				{
					description: 'Search term to find across searchable fields',
					example: '?search=javascript',
				},
				{
					description: 'Comma-separated list of fields to search in (must be in allowedFields)',
					example: '?search=javascript&searchFields=CourseName,CourseDescription',
				},
			],
		},
		{
			category: 'Sorting',
			items: [
				{
					description: 'Field to sort by, optionally followed by sort direction',
					example: '?orderby=Name,DESC',
				},
			],
		},
		{
			category: 'Pagination',
			items: [
				{
					description: 'Number of records to return',
					example: '?limit=10',
				},
				{
					description: 'Page number based on limit',
					example: '?limit=10&page=2',
				},
				{
					description: 'Direct offset value (alternative to page)',
					example: '?limit=10&offset=20',
				},
			],
		},
	],
};
const listOfEndpoints = [
	{
		entity: 'Authentication',
		sap: '/api/users',
		services: {
			post: [
				{
					endpoint: '/register',
					description: 'Register a new user',
					auth: false,
					examples: [`${API_URL}/users/register`],
				},
				{
					endpoint: '/login',
					description: 'Login a user',
					auth: false,
					examples: [`${API_URL}/users/login`],
				},
				{
					endpoint: '/refresh',
					description: 'Refresh authentication token',
					auth: false,
					examples: [`${API_URL}/users/refresh`],
				},
				{
					endpoint: '/logout',
					description: 'Logout a user',
					auth: false,
					examples: [`${API_URL}/users/logout`],
				},
				{
					endpoint: '/checkAuth',
					description: 'Check if user is authenticated',
					auth: true,
					examples: [`${API_URL}/users/checkAuth`],
				},
			],
		},
	},
	{
		entity: 'Course',
		sap: '/api/courses',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all courses',
					auth: false,
					examples: [`${API_URL}/courses`],
				},
				{
					endpoint: '/:id',
					description: 'Return a course by ID',
					auth: false,
					examples: [`${API_URL}/courses/1`],
				},
				{
					endpoint: '/publicationstatus',
					description: 'Return all courses with attached publication status',
					auth: true,
					examples: [
						`${API_URL}/courses/publicationstatus`,
						`${API_URL}/courses/publicationstatus?CoursePublicationstatusID=1`,
					],
				},
				{
					endpoint: '/mycourses',
					description: 'Return all courses created by the authenticated user',
					auth: true,
					examples: [`${API_URL}/courses/mycourses`],
				},
				{
					endpoint: '/users',
					description: 'Return all courses with statuses for the authenticated user',
					auth: true,
					examples: [
						`${API_URL}/courses/users`,
						`${API_URL}/courses/users?UsercontentstatusName=NotStarted`,
					],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Create a new course',
					auth: true,
					roles: ['Admin', 'ContentCreator'],
					examples: [`${API_URL}/courses`],
				},
			],
			put: [
				{
					endpoint: '/:id',
					description: 'Update a course by ID',
					auth: true,
					roles: ['Admin', 'ContentCreator'],
					examples: [`${API_URL}/courses/1`],
				},
				{
					endpoint: '/:id/course-edit',
					description: 'Edit course details',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/courses/1/course-edit`],
				},
				{
					endpoint: '/:id/content-status',
					description: 'Update course content status',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/courses/1/content-status`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a course by ID',
					auth: true,
					roles: ['Admin', 'ContentCreator'],
					examples: [`${API_URL}/courses/1`],
				},
			],
		},
	},
	{
		entity: 'CourseCategory',
		sap: '/api/coursecategories',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all course categories',
					auth: false,
					examples: [`${API_URL}/coursecategories`],
				},
				{
					endpoint: '/:id',
					description: 'Return a course category by ID',
					auth: false,
					examples: [`${API_URL}/coursecategories/1`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Create a new course category',
					auth: true,
					roles: ['Admin', 'ContentCreator'],
					examples: [`${API_URL}/coursecategories`],
				},
			],
			put: [
				{
					endpoint: '/:id',
					description: 'Update a course category by ID',
					auth: true,
					roles: ['Admin', 'ContentCreator'],
					examples: [`${API_URL}/coursecategories/1`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a course category by ID',
					auth: true,
					roles: ['Admin', 'ContentCreator'],
					examples: [`${API_URL}/coursecategories/1`],
				},
			],
		},
	},
	{
		entity: 'Lesson',
		sap: '/api/lessons',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all lessons',
					auth: true,
					examples: [`${API_URL}/lessons`],
				},
				{
					endpoint: '/:id',
					description: 'Return a lesson by ID',
					auth: false,
					examples: [`${API_URL}/lessons/1`],
				},
				{
					endpoint: '/mylessons',
					description: 'Return all lessons created by the authenticated user',
					auth: true,
					examples: [`${API_URL}/lessons/mylessons`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Create a new lesson',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/lessons`],
				},
			],
			put: [
				{
					endpoint: '/:id',
					description: 'Update a lesson by ID',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/lessons/1`],
				},
				{
					endpoint: '/:id/name-description',
					description: 'Update lesson name and description',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/lessons/1/name-description`],
				},
				{
					endpoint: '/:id/content-status',
					description: 'Update lesson content status',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/lessons/1/content-status`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a lesson by ID',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/lessons/1`],
				},
			],
		},
	},
	{
		entity: 'Quiz',
		sap: '/api/quizzes',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all quizzes',
					auth: true,
					examples: [`${API_URL}/quizzes`],
				},
				{
					endpoint: '/:id',
					description: 'Return a quiz by ID',
					auth: false,
					examples: [`${API_URL}/quizzes/1`],
				},
				{
					endpoint: '/myquizzes',
					description: 'Return all quizzes created by the authenticated user',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/quizzes/myquizzes`],
				},
				{
					endpoint: '/:id/questions-answers',
					description: 'Return a quiz with its questions and answers',
					auth: false,
					examples: [`${API_URL}/quizzes/1/questions-answers`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Create a new quiz',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/quizzes`],
				},
			],
			put: [
				{
					endpoint: '/:id',
					description: 'Update a quiz by ID',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/quizzes/1`],
				},
				{
					endpoint: '/:id/name-description',
					description: 'Update quiz name and description',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/quizzes/1/name-description`],
				},
				{
					endpoint: '/:id/content-status',
					description: 'Update quiz content status',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/quizzes/1/content-status`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a quiz by ID',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/quizzes/1`],
				},
			],
		},
	},
	{
		entity: 'Question',
		sap: '/api/questions',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all questions',
					auth: true,
					examples: [`${API_URL}/questions`, `${API_URL}/questions?QuestionQuizID=1`],
				},
				{
					endpoint: '/:id',
					description: 'Return a question by ID',
					auth: true,
					examples: [`${API_URL}/questions/1`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Create a new question',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/questions`],
				},
			],
			put: [
				{
					endpoint: '/:id',
					description: 'Update a question by ID',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/questions/1`],
				},
				{
					endpoint: '/:id/reorder',
					description: 'Reorder questions within a quiz',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/questions/1/reorder`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a question by ID',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/questions/1`],
				},
			],
		},
	},
	{
		entity: 'Answer',
		sap: '/api/answers',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all answers',
					auth: true,
					examples: [`${API_URL}/answers`, `${API_URL}/answers?AnswerQuestionID=1`],
				},
				{
					endpoint: '/:id',
					description: 'Return an answer by ID',
					auth: true,
					examples: [`${API_URL}/answers/1`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Create a new answer',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/answers`],
				},
			],
			put: [
				{
					endpoint: '/:id',
					description: 'Update an answer by ID',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/answers/1`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete an answer by ID',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/answers/1`],
				},
			],
		},
	},
	{
		entity: 'CourseContent',
		sap: '/api/coursecontents',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all course contents',
					auth: true,
					examples: [`${API_URL}/coursecontents`, `${API_URL}/coursecontents?CoursecontentCourseID=1`],
				},
				{
					endpoint: '/simplified',
					description: 'Return simplified course content information',
					auth: false,
					examples: [`${API_URL}/coursecontents/simplified`],
				},
				{
					endpoint: '/simplified/user-completion',
					description: 'Return simplified course content with user completion status',
					auth: true,
					examples: [`${API_URL}/coursecontents/simplified/user-completion`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Create a new course content entry',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/coursecontents`],
				},
			],
			put: [
				{
					endpoint: '/:id',
					description: 'Reorder course content',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/coursecontents/1`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a course content entry by ID',
					auth: true,
					roles: ['ContentCreator'],
					examples: [`${API_URL}/coursecontents/1`],
				},
			],
		},
	},
	{
		entity: 'UserBookmark',
		sap: '/api/userbookmarks',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all user bookmarks',
					auth: true,
					roles: ['Admin'],
					examples: [`${API_URL}/userbookmarks`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Create a new user bookmark',
					auth: true,
					examples: [`${API_URL}/userbookmarks`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a user bookmark by ID (ownership checked)',
					auth: true,
					examples: [`${API_URL}/userbookmarks/1`],
				},
			],
		},
	},
	{
		entity: 'UserContentStatus',
		sap: '/api/usercontentstatus',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all user content statuses',
					auth: true,
					examples: [`${API_URL}/usercontentstatus`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Create a new user content status',
					auth: true,
					roles: ['Admin'],
					examples: [`${API_URL}/usercontentstatus`],
				},
			],
			put: [
				{
					endpoint: '/:id',
					description: 'Update a user content status by ID',
					auth: true,
					roles: ['Admin'],
					examples: [`${API_URL}/usercontentstatus/1`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a user content status by ID',
					auth: true,
					roles: ['Admin'],
					examples: [`${API_URL}/usercontentstatus/1`],
				},
			],
		},
	},
	{
		entity: 'UserCourse',
		sap: '/api/usercourses',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all user courses for the authenticated user',
					auth: true,
					examples: [`${API_URL}/usercourses`],
				},
				{
					endpoint: '/:id',
					description: 'Return a user course by ID for the authenticated user',
					auth: true,
					examples: [`${API_URL}/usercourses/1`],
				},
				{
					endpoint: '/users',
					description: 'Return all user courses for the authenticated user',
					auth: true,
					examples: [`${API_URL}/usercourses/users`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Enroll user in a course',
					auth: true,
					examples: [`${API_URL}/usercourses`],
				},
			],
			put: [
				{
					endpoint: '/:id/complete',
					description: 'Mark a course as complete (ownership checked)',
					auth: true,
					examples: [`${API_URL}/usercourses/1/complete`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Unenroll from a course (ownership checked)',
					auth: true,
					examples: [`${API_URL}/usercourses/1`],
				},
			],
		},
	},
	{
		entity: 'UserLesson',
		sap: '/api/userlessons',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all user lessons',
					auth: true,
					roles: ['ContentCreator', 'Admin'],
					examples: [`${API_URL}/userlessons`],
				},
				{
					endpoint: '/users',
					description: 'Return all user lessons for the authenticated user',
					auth: true,
					examples: [`${API_URL}/userlessons/users`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Start a lesson for a user',
					auth: true,
					examples: [`${API_URL}/userlessons`],
				},
			],
			put: [
				{
					endpoint: '/:id/complete',
					description: 'Mark a lesson as complete (ownership checked)',
					auth: true,
					examples: [`${API_URL}/userlessons/1/complete`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a user lesson (ownership checked)',
					auth: true,
					examples: [`${API_URL}/userlessons/1`],
				},
			],
		},
	},
	{
		entity: 'UserQuiz',
		sap: '/api/userquizzes',
		services: {
			get: [
				{
					endpoint: '/',
					description: 'Return all user quizzes',
					auth: true,
					roles: ['ContentCreator', 'Admin'],
					examples: [`${API_URL}/userquizzes`],
				},
				{
					endpoint: '/users',
					description: 'Return all user quizzes for the authenticated user',
					auth: true,
					examples: [`${API_URL}/userquizzes/users`],
				},
			],
			post: [
				{
					endpoint: '/',
					description: 'Start a quiz for a user',
					auth: true,
					examples: [`${API_URL}/userquizzes`],
				},
			],
			put: [
				{
					endpoint: '/:id/complete',
					description: 'Mark a quiz as complete with results (ownership checked)',
					auth: true,
					examples: [`${API_URL}/userquizzes/1/complete`],
				},
			],
			delete: [
				{
					endpoint: '/:id',
					description: 'Delete a user quiz (ownership checked)',
					auth: true,
					examples: [`${API_URL}/userquizzes/1`],
				},
			],
		},
	},
];


router.get('/', authenticateToken, authoriseRoles(['Admin']), (req, res) => {
	res.status(200).json({
		message: 'List of available endpoints',
		commonQueryParameters,
		listOfEndpoints,
	});
});

const defaultRouter = express.Router();

defaultRouter.get('/', authenticateToken, authoriseRoles(['Admin']), (req, res) => {
	res.status(404).json({
		message: 'Specified endpoint not found',
		commonQueryParameters,
		listOfEndpoints,
	});
});

export { router as domainRouter, defaultRouter };
