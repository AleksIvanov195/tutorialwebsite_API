import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const UserlessonModel = {
	table: 'Userlesson',
	idField: 'UserlessonID',
	mutableFields: [
		'UserlessonUserID',
		'UserlessonLessonID',
		'UserlessonUsercontentstatusID ',
		'UserlessonStartdate',
		'UserlessonCompletiondate',
	],
	insertFields: [
		'UserlessonUserID',
		'UserlessonLessonID',
		'UserlessonUsercontentstatusID ',
		'UserlessonStartdate',
		'UserlessonCompletiondate', // Temporary
	],
	creatorField: 'UserlessonUserID',
	buildReadQuery: (req) => {

		const fields = [
			`${UserlessonModel.idField}`,
			...UserlessonModel.mutableFields,
		];

		const table = UserlessonModel.table;
		let where = '';
		const parameters = {};

		if (req.path.includes('/users')) {
			const userID = req.userID;
			where += ' AND UserlessonUserID = :UserlessonUserID';
			parameters.UserlessonUserID = parseInt(userID);
		}

		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default UserlessonModel;