import { constructPreparedStatement, constructInsertQuery, parseRequestQuery } from './modelutils.js';

const CourseModel = {
	table: 'Course',
	idfield: 'CourseID',
	mutableFields: [
		'CourseName',
		'CourseDescription',
		'CourseCoursecategoryID',
		'CoursecategoryName',
		'CourseDatecreated',
		'CoursePublicationstatusID',
	],
	insertFields: [
		'CourseName',
		'CourseDescription',
		'CourseCoursecategoryID',
		'CoursePublicationstatusID',
	],

	// Build the query for reading data
	buildReadQuery: (req) => {
		// Initialisations ------------------------
		const userID = req.userID;
		const { courseID } = req.params;

		const fields = [
			`${CourseModel.idfield}`,
			...CourseModel.mutableFields,
		];

		let table = `${CourseModel.table}
								LEFT JOIN
								Coursecategory
								ON
								Course.CourseCoursecategoryID = Coursecategory.CoursecategoryID`;

		let where = '';
		const parameters = {};

		// Add publciation status if required
		if (req.path.includes('/publicationstatus')) {
			fields.push('PublicationstatusName');
			table += ` INNER JOIN 
    						Publicationstatus 
								ON 
    						Course.CoursePublicationstatusID = Publicationstatus.PublicationstatusID`;
		}
		// Filter by course ID if it is provided
		if (courseID) {
			where += 'AND CourseID = :CourseID';
			parameters.CourseID = parseInt(courseID);
		}

		// Add user-related fields and join tables if user ID is provided
		if (userID) {
			fields.push(
				'CoursestatusID',
				'CoursestatusName',
			);
			table = `(SELECT 
						${CourseModel.idfield},
						${CourseModel.mutableFields},
						COALESCE(Coursestatus.CoursestatusID, 1) AS CoursestatusID,
						COALESCE(Coursestatus.CoursestatusName, 'NotStarted') AS CoursestatusName
					FROM 
					${CourseModel.table}
					LEFT JOIN
					Coursecategory ON Course.CourseCoursecategoryID = Coursecategory.CoursecategoryID
					LEFT JOIN 
						Usercourse ON Course.CourseID = Usercourse.UsercourseCourseID 
						AND Usercourse.UsercourseUserID = :UserID
					LEFT JOIN 
						Coursestatus ON Usercourse.UsercourseCoursestatusID = Coursestatus.CoursestatusID
				) AS subquery`;

			parameters.UserID = parseInt(userID);
		}
		// Add filters from request query if any
		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
	buildCreateQuery: (courseData) => {
		return constructInsertQuery(CourseModel.insertFields, CourseModel.table, courseData);
	},
};

export default CourseModel;
