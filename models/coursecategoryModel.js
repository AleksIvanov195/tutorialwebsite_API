import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';
const coursecategoryModel = {
	table: 'Coursecategory',
	idField: 'CoursecategoryID',
	mutableFields: [
		'CoursecategoryID',
		'CoursecategoryName',
	],
	insertFields: [
		'CoursecategoryName',
	],
	buildReadQuery: (req) => {
		const { id: courseCategoryID} = req.params;

		const fields = [
			coursecategoryModel.idField,
			...coursecategoryModel.mutableFields,
		];

		const table = `${coursecategoryModel.table}`;

		let where = '';
		const parameters = {};

		if(courseCategoryID) {
			where += 'AND CoursecategoryID = :CoursecategoryID';
			parameters.CoursecategoryID = parseInt(courseCategoryID);
		}

		const filter = parseRequestQuery(req, fields);
		return constructPreparedStatement(fields, table, where, parameters, filter);
	},
};

export default coursecategoryModel;