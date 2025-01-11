import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const UserCourseModel = {
	table: 'Usercourse',
	idField: 'UsercourseID',
	mutableFields: [
		'UsercourseUserID',
		'UsercourseCourseID',
		'UsercourseStartdate',
		'UsercourseCompletionDate',
		'UsercourseUsercontentstatusID',
	],

	// Related tables: Course and Usercontentstatus

	buildReadQuery: (req) => {
		// Initialisations ------------------------
		const userID = req.userID;
		const { usercourseID } = req.params;
		const fields = [
			UserCourseModel.idField,
			...UserCourseModel.mutableFields,
			'UsercontentstatusName',
			'CourseID',
			'CourseName',
			'CourseDescription',
			'CourseCoursecategoryID',
			'CourseDatecreated',
		];

		const table = [
			`${UserCourseModel.table}
			INNER JOIN Course ON Usercourse.UsercourseCourseID = Course.CourseID
			INNER JOIN Usercontentstatus ON Usercourse.UsercourseUsercontentstatusID = Usercontentstatus.UsercontentstatusID`,
		];

		let where = '';
		const parameters = {};

		if (usercourseID) {
			where += ' AND UsercourseID = :UsercourseID';
			parameters.UsercourseID = parseInt(usercourseID);
		}

		if (userID) {
			where += ' AND UsercourseUserID = :UserID';
			parameters.UserID = parseInt(userID);
		}

		const filter = parseRequestQuery(req, fields);

		return constructPreparedStatement(fields, table, where, parameters, filter);
	},
};

export default UserCourseModel;
