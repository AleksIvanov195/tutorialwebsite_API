import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const UsercontentstatusModel = {
	table: 'Usercontentstatus',
	idField: 'UsercontentstatusID',
	mutableFields: [
		'UsercontentstatusName',
	],
	insertFields: [
		'UsercontentstatusName',
	],

	buildReadQuery: (req) => {

		const fields = [
			`${UsercontentstatusModel.idField}`,
			...UsercontentstatusModel.mutableFields,
		];

		const table = UsercontentstatusModel.table;
		let where = '';
		const parameters = {};


		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default UsercontentstatusModel;