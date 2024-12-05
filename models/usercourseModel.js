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
		const userID = req.userID;
		const { usercourseID } = req.params;
		const fields = [
			UserCourseModel.idfield,
			...UserCourseModel.mutableFields,
			'CoursestatusName',
			'CourseID',
			'CourseName',
			'CourseDescription',
			'CourseCoursecategoryID',
			'CourseDatecreated',
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

		const filter = parseRequestQuery(req, fields);

		return constructPreparedStatement(fields, table, where, parameters, filter);
	},
};

export default UserCourseModel;
