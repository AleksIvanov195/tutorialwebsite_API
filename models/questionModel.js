import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const QuestionModel = {
	table: 'Question',
	idField: 'QuestionID',
	mutableFields: [
		'QuestionText',
		'QuestionFeedbacktext',
		'QuestionDatecreated',
		'QuestionOrdernumber',
		'QuestionType',
		'QuestionQuizID',
	],
	insertFields: [
		'QuestionText',
		'QuestionFeedbacktext',
		'QuestionOrdernumber',
		'QuestionType',
		'QuestionQuizID',
	],

	buildReadQuery: (req) => {
		const { id: questionID } = req.params;
		const fields = [
			`${QuestionModel.idField}`,
			...QuestionModel.mutableFields,
		];

		const table = QuestionModel.table;
		let where = '';
		const parameters = {};

		if (questionID) {
			where += 'AND QuestionID = :QuestionID';
			parameters.QuestionID = parseInt(questionID);
		}
		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default QuestionModel;