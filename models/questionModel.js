import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const QuestionModel = {
	table: 'Question',
	idField: 'QuestionID',
	mutableFields: [
		'QuestionText',
		'QuestionFeedbacktext',
		'QuestionDatecreated',
		'QuestionQuizID',
	],
	insertFields: [
		'QuestionText',
		'QuestionFeedbacktext',
		'QuestionQuizID',
	],

	buildReadQuery: (req) => {
		const fields = [
			`${QuestionModel.idField}`,
			...QuestionModel.mutableFields,
		];

		const table = QuestionModel.table;
		let where = '';

		const parameters = {};
		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default QuestionModel;