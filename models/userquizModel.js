import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const UserquizModel = {
	table: 'Userquiz',
	idField: 'UserquizID ',
	mutableFields: [
		'UserquizUserID',
		'UserquizQuizID',
		'UserquizUsercontentstatusID',
		'UserquizStartdate',
		'UserquizCompletiondate',
		'UserquizResult',
	],
	insertFields: [
		'UserquizUserID',
		'UserquizQuizID',
		'UserquizResult',
		'UserquizUsercontentstatusID',
		'UserquizCompletiondate', // Temporary
	],
	creatorField: 'UserquizUserID',
	buildReadQuery: (req) => {

		const fields = [
			`${UserquizModel.idField}`,
			...UserquizModel.mutableFields,
		];

		const table = UserquizModel.table;
		let where = '';
		const parameters = {};

		if (req.path.includes('/users')) {
			const userID = req.userID;
			where += ' AND UserquizUserID = :UserquizUserID';
			parameters.UserquizUserID = parseInt(userID);
		}

		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default UserquizModel;