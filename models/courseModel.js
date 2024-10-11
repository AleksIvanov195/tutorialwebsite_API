import { constructPreparedStatement } from './modelutils.js';

const CourseModel = {
	table: 'Course',
	idfield: 'CourseID',
	mutableFields: [
		'CourseName',
		'CourseDescription',
		'CourseCategory',
		'CourseDatecreated',
	],

	// Related tables: Usercourse and CourseStatus

	buildReadQuery: (courseID, userID) => {
		// Initialisations ------------------------
		const fields = [
			`${CourseModel.idfield}`,
			...CourseModel.mutableFields,
		];

		let table = `${CourseModel.table}`;

		let where = '';
		const parameters = {};

		if (courseID) {
			where += 'CourseID = :CourseID';
			parameters.CourseID = parseInt(courseID);
		}

		if (userID) {
			fields.push(
				'COALESCE(Coursestatus.CoursestatusID, 1) AS CourseStatusID',
				'COALESCE(Coursestatus.CoursestatusName, \'NotStarted\') AS CourseStatus'
			);

			table = `${CourseModel.table}
			LEFT JOIN Usercourse ON Course.CourseID = Usercourse.UsercourseCourseID 
			AND Usercourse.UsercourseUserID = :UserID
			LEFT JOIN Coursestatus ON Usercourse.UsercourseCoursestatusID = Coursestatus.CoursestatusID`;

			where += '1=1';
			parameters.UserID = parseInt(userID);
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

export default CourseModel;
