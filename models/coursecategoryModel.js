import { constructPreparedStatement, constructInsertQuery, parseRequestQuery } from './modelutils.js';
const coursecategoryModel = {
	table: 'coursecategory',
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
	buildCreateQuery: (coursecategoryData) => {
		return constructInsertQuery(coursecategoryModel.insertFields, coursecategoryModel.table, coursecategoryData);
	},
};

export default coursecategoryModel;