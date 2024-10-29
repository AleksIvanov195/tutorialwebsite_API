import { constructPreparedStatement, constructInsertQuery, parseRequestQuery } from './modelutils.js';

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

	buildReadQuery: (req) => {
		// Initialisations ------------------------
		const { userID, courseID } = req.params;
		const fields = [
			`${CourseModel.idfield}`,
			...CourseModel.mutableFields,
		];

		let table = `${CourseModel.table}`;

		let where = '';
		const parameters = {};

		if (courseID) {
			where += 'AND CourseID = :CourseID';
			parameters.CourseID = parseInt(courseID);
		}

		if (userID) {
			fields.push(
				'CoursestatusID',
				'CoursestatusName'
			);

			table = `(SELECT 
						${CourseModel.idfield},
						${CourseModel.mutableFields},
						COALESCE(Coursestatus.CoursestatusID, 1) AS CoursestatusID,
						COALESCE(Coursestatus.CoursestatusName, 'NotStarted') AS CoursestatusName
					FROM 
					${CourseModel.table}
					LEFT JOIN 
						Usercourse ON Course.CourseID = Usercourse.UsercourseCourseID 
						AND Usercourse.UsercourseUserID = :UserID
					LEFT JOIN 
						Coursestatus ON Usercourse.UsercourseCoursestatusID = Coursestatus.CoursestatusID
				) AS subquery`;

			parameters.UserID = parseInt(userID);
		}
		const filter = parseRequestQuery(req, [...CourseModel.mutableFields, CourseModel.idfield, 'CoursestatusName', 'CoursestatusID']);

		// Construct the SQL query string
		const { query, params } = constructPreparedStatement(
			fields,
			table,
			where,
			parameters,
			filter
		);
		console.log(query);
		console.log('Parameters:', params);
		return { query, params };
	},
	buildCreateQuery: (courseData) => {
		return constructInsertQuery(CourseModel.mutableFields, CourseModel.table, courseData);
	},
};

export default CourseModel;
