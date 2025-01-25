import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const AnswerModel = {
	table: 'Answer',
	idField: 'AnswerID',
	mutableFields: [
		'AnswerText',
		'AnswerDatecreated',
		'AnswerQuestionID',
	],
	insertFields: [
		'AnswerText',
		'AnswerQuestionID',
	],

	buildReadQuery: (req) => {
		const fields = [
			`${AnswerModel.idField}`,
			...AnswerModel.mutableFields,
		];

		const table = AnswerModel.table;
		let where = '';

		const parameters = {};
		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default AnswerModel;