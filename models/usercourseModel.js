import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const UserCourseModel = {
	table: 'Usercourse',
	idfield: 'UsercourseID',
	mutableFields: [
		'UsercourseUserID',
		'UsercourseCourseID',
		'UsercourseStartdate',
		'UsercourseCompletionDate',
		'UsercourseCoursestatusID',
	],

	// Related tables: Course and CourseStatus

	buildReadQuery: (req) => {
		// Initialisations ------------------------
		const { usercourseID, userID } = req.params;
		const fields = [
			UserCourseModel.idfield,
			...UserCourseModel.mutableFields,
			'CourseStatus.CoursestatusName',
			'Course.CourseID',
			'Course.CourseName',
			'Course.CourseDescription',
			'Course.CourseCategory',
			'Course.CourseDatecreated',
		];

		const table = [
			`${UserCourseModel.table}
			INNER JOIN Course ON Usercourse.UsercourseCourseID = Course.CourseID
			INNER JOIN Coursestatus ON Usercourse.UsercourseCoursestatusID = Coursestatus.CoursestatusID`,
		];

		let where = '';
		const parameters = {};

		if (usercourseID) {
			where += ' AND Usercourse.UsercourseID = :UsercourseID';
			parameters.UsercourseID = parseInt(usercourseID);
		}

		if (userID) {
			where += ' AND Usercourse.UsercourseUserID = :UserID';
			parameters.UserID = parseInt(userID);
		}

		const filter = parseRequestQuery(req, [...UserCourseModel.mutableFields, UserCourseModel.idfield, 'CoursestatusName', 'CoursestatusID']);
		if (filter) {
			where += filter.filters;
			Object.assign(parameters, filter.parameters);

		}
		// Construct the SQL query string
		const { query, params } = constructPreparedStatement(
			fields,
			table,
			where,
			parameters
		);
		console.log(query);
		console.log('Parameters:', params);
		return { query, params };
	},
};

export default UserCourseModel;
