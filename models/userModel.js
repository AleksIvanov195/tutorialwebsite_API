import { constructPreparedStatement, constructInsertQuery, parseRequestQuery } from './modelutils.js';
const userModel = {
	table: 'user',
	idfield: 'UserID',
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
			userModel.idfield,
			...userModel.mutableFields,
		];

		const table = `${userModel.table}`;

		let where = '';
		const parameters = {};
		if (userID) {
			where += ' AND user.userID = :userID';
			parameters.userID = userID;
		}

		if (UserEmail) {
			where += ' AND user.UserEmail = :UserEmail';
			parameters.UserEmail = UserEmail;
		}

		const filter = parseRequestQuery(req, [...userModel.mutableFields, userModel.idfield]);
		return constructPreparedStatement(fields, table, where, parameters, filter);
	},
	buildCreateQuery: (userData) => {
		return constructInsertQuery(userModel.insertFields, userModel.table, userData);
	},
};

export default userModel;