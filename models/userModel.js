import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';
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
	buildReadQuery: (req) => {
		// Initialisations ------------------------
		const { userID } = req.params;
		const fields = [
			userModel.idfield,
			...userModel.mutableFields,
		];

		const table = `${userModel.table}`;

		let where = '';
		const parameters = {};

		if (userID) {
			where += ' AND user.UserID = :UserID';
			parameters.UserID = parseInt(userID);
		}

		const filter = parseRequestQuery(req, [...userModel.mutableFields, userModel.idfield]);

		return constructPreparedStatement(fields, table, where, parameters, filter);
	},
};

export default userModel;