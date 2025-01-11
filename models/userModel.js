import { constructPreparedStatement, constructInsertQuery, parseRequestQuery } from './modelutils.js';
const userModel = {
	table: 'user',
	idField: 'UserID',
	mutableFields: [
		'UserName',
		'UserEmail',
		'UserPassword',
		'UserType',
		'UserDatecreated',
	],
	insertFields: [
		'UserName',
		'UserEmail',
		'UserPassword',
		'UserType',
	],
	buildReadQuery: (req) => {
		// Initialisations ------------------------
		const { UserEmail, userID } = req.body;
		const fields = [
			userModel.idField,
			...userModel.mutableFields,
		];

		const table = `${userModel.table}`;

		let where = '';
		const parameters = {};
		if (userID) {
			where += ' AND userID = :userID';
			parameters.userID = userID;
		}

		if (UserEmail) {
			where += ' AND UserEmail = :UserEmail';
			parameters.UserEmail = UserEmail;
		}

		const filter = parseRequestQuery(req, fields);
		return constructPreparedStatement(fields, table, where, parameters, filter);
	},
	buildCreateQuery: (userData) => {
		return constructInsertQuery(userModel.insertFields, userModel.table, userData);
	},
};

export default userModel;