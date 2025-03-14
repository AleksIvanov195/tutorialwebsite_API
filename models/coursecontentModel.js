import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const CourseContentModel = {
	table: 'Coursecontent',
	idField: 'CoursecontentID',
	mutableFields: [
		'CoursecontentCourseID',
		'CoursecontentLessonID',
		'CoursecontentQuizID',
		'CoursecontentOrder',
	],
	insertFields: [
		'CoursecontentCourseID',
		'CoursecontentLessonID',
		'CoursecontentQuizID',
		'CoursecontentOrder',
	],

	buildReadQuery: (req) => {

		let fields = [
			`${CourseContentModel.idField}`,
			...CourseContentModel.mutableFields,
		];

		let table = CourseContentModel.table;
		const where = '';
		const parameters = {};
		let groupBy = '';

		if (req.path.includes('/simplified')) {
			fields = [
				`${CourseContentModel.idField}`,
				'CoursecontentCourseID',
				'CoursecontentOrder',
				'CASE WHEN CoursecontentLessonID IS NOT NULL THEN CoursecontentLessonID ELSE CoursecontentQuizID END AS ContentID',
				'CASE WHEN CoursecontentLessonID IS NOT NULL THEN "Lesson" ELSE "Quiz" END AS ContentType',
				'COALESCE(Lesson.LessonName, Quiz.QuizName) AS ContentName',
			];

			table += `
			LEFT JOIN Lesson ON Coursecontent.CoursecontentLessonID = Lesson.LessonID
			LEFT JOIN Quiz ON Coursecontent.CoursecontentQuizID = Quiz.QuizID`;
		}

		if (req.path.includes('/simplified/user-completion')) {
			const userID = req.userID;
			fields.push(
				`CASE 
        WHEN Coursecontent.CoursecontentQuizID IS NOT NULL THEN
            CASE 
                WHEN MAX(Userquiz.UserquizUsercontentstatusID) = 3 THEN TRUE
                ELSE FALSE
            END
   			 END AS ContentStatus`,
			);
			table += `
			LEFT JOIN Userquiz ON Userquiz.UserquizQuizID = Quiz.QuizID AND Userquiz.UserquizUserID = :UserID
			`;
			groupBy = 'CoursecontentID';
			parameters.UserID = parseInt(userID);
		}

		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default CourseContentModel;