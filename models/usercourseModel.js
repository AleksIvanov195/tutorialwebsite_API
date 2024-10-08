import { constructPreparedStatement } from "./modelutils.js";

const UserCourseModel ={
	table: 'Usercourse',
	idfield: 'UsercourseID',
	mutableFields: [
		'UsercourseUserID', 
		'UsercourseCourseID', 
		'UsercourseStartdate', 
		'UsercourseCompletionDate',
		'UsercourseCoursestatusID',],

	// Related tables : Course and CourseStatus

	buildReadQuery: (userId, statusId) =>{
		// Initialisations ------------------------
		let fields = [
			UserCourseModel.idfield,
			...UserCourseModel.mutableFields,
			'CourseStatus.CoursestatusName',
			'Course.CourseID',
			'Course.CourseName',
			'Course.CourseDescription',
			'Course.CourseCategory',
			'Course.CourseDatecreated',
			
		];

		let table = [
			`${UserCourseModel.table}
			INNER JOIN Course ON Usercourse.UsercourseCourseID = Course.CourseID
			INNER JOIN Coursestatus ON Usercourse.UsercourseCoursestatusID = Coursestatus.CoursestatusID`
		]

		let where = '';
		let parameters = {};

		if (userId) {
			where += 'Usercourse.UsercourseUserID = :UserID';
			parameters.UserID = parseInt(userId);
		}
		
		if (statusId) {
			if (where) where += ' AND '; // Add AND if there is already a condition
			where += 'Usercourse.UsercourseCoursestatusID = :StatusID';
			parameters.StatusID = parseInt(statusId);
		}

		// Construct the SQL query string
		const { query, params } = constructPreparedStatement(fields, table, where, parameters);
		return { query, params };

	},

}



export default UserCourseModel;