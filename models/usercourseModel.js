import { constructPreparedStatement } from './modelutils.js';

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
		const { usercourseID, userID, statusID } = req.params;
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
			where += 'Usercourse.UsercourseID = :UsercourseID';
			parameters.UsercourseID = parseInt(usercourseID);
		}

		if (userID) {
			if (where) where += ' AND ';
			where += 'Usercourse.UsercourseUserID = :UserID';
			parameters.UserID = parseInt(userID);
		}

		if (statusID) {
			if (where) where += ' AND ';
			where += 'Usercourse.UsercourseCoursestatusID = :StatusID';
			parameters.StatusID = parseInt(statusID);
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
