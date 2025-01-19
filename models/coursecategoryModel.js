import { constructPreparedStatement, constructInsertQuery, parseRequestQuery } from './modelutils.js';
const coursecategoryModel = {
	table: 'Coursecategory',
	idField: 'CoursecategoryID',
	mutableFields: [
		'CoursecategoryName',
	],
	insertFields: [
		'CoursecategoryID',
		'CoursecategoryName',
	],
	buildReadQuery: (req) => {
		// Initialisations ------------------------
		const fields = [
			coursecategoryModel.idField,
			...coursecategoryModel.mutableFields,
		];

		const table = `${coursecategoryModel.table}`;

		let where = '';
		const parameters = {};

		const filter = parseRequestQuery(req, fields);
		return constructPreparedStatement(fields, table, where, parameters, filter);
	},
};

export default coursecategoryModel;