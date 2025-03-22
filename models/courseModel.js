import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const CourseModel = {
	table: 'Course',
	idField: 'CourseID',
	mutableFields: [
		'CourseName',
		'CourseDescription',
		'CourseCoursecategoryID',
		'CoursecategoryName',
		'CourseDatecreated',
		'CoursePublicationstatusID',
		'CoursecreatorUserID',
	],
	insertFields: [
		'CourseName',
		'CourseDescription',
		'CourseCoursecategoryID',
		'CoursePublicationstatusID',
		'CoursecreatorUserID',
	],
	creatorField: 'CoursecreatorUserID',

	// Build the query for reading data
	buildReadQuery: (req) => {
		// Initialisations ------------------------
		const userID = req.userID;
		const { id: courseID } = req.params;

		const fields = [
			`${CourseModel.idField}`,
			...CourseModel.mutableFields,
		];

		let table = `${CourseModel.table}
								LEFT JOIN Coursecategory ON CourseCoursecategoryID = CoursecategoryID`

		let where = '';
		const parameters = {};

		// Filter by course ID if it is provided
		if (courseID) {
			where += 'AND CourseID = :CourseID';
			parameters.CourseID = parseInt(courseID);
		}

		// Add user-related fields and join tables if user ID is provided
		if (req.path.includes('/users')) {
			fields.push(
				'UsercontentstatusID',
				'UsercontentstatusName',
				'UserbookmarkID',
				'IsBookmarked',
			);
			table = `(SELECT 
						${CourseModel.idField},
						${CourseModel.mutableFields},
						COALESCE(Usercontentstatus.UsercontentstatusID, 1) AS UsercontentstatusID,
						COALESCE(Usercontentstatus.UsercontentstatusName, 'NotStarted') AS UsercontentstatusName,
						UserbookmarkID,
						CASE 
							WHEN Userbookmark.UserbookmarkCourseID IS NOT NULL THEN 1 
							ELSE 0 
						END AS IsBookmarked
					FROM 
					${CourseModel.table}
					LEFT JOIN
					Coursecategory ON Course.CourseCoursecategoryID = Coursecategory.CoursecategoryID
					LEFT JOIN 
						Usercourse ON Course.CourseID = Usercourse.UsercourseCourseID 
						AND Usercourse.UsercourseUserID = :UserID
					LEFT JOIN 
						Usercontentstatus ON Usercourse.UsercourseUsercontentstatusID = Usercontentstatus.UsercontentstatusID
					LEFT JOIN 
					  Userbookmark ON Course.CourseID = Userbookmark.UserbookmarkCourseID AND Userbookmark.UserbookmarkUserID = :UserID
				) AS subquery`;

			parameters.UserID = parseInt(userID);
		}
		if (req.path.includes('/mycourses')) {
			fields.push('PublicationstatusName as CoursePublicationstatusName');
			table += ' INNER JOIN Publicationstatus ON CoursePublicationstatusID = PublicationstatusID';
			where += 'AND CoursecreatorUserID = :CoursecreatorUserID';
			parameters.CoursecreatorUserID = parseInt(userID);
		}
		// Add filters from request query if any
		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default CourseModel;
