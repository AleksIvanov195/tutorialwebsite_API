import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const UserbookmarkModel = {
	table: 'Userbookmarks',
	idField: 'UserbookmarkID',
	mutableFields: [
		'UserbookmarkCourseID',
		'UserbookmarkUserID',
	],
	insertFields: [
		'UserbookmarkCourseID',
		'UserbookmarkUserID',
	],
	creatorField: 'UserbookmarkUserID',

	buildReadQuery: (req) => {

		const fields = [
			`${UserbookmarkModel.idField}`,
			...UserbookmarkModel.mutableFields,
		];

		const table = UserbookmarkModel.table;
		let where = '';
		const parameters = {};


		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default UserbookmarkModel;