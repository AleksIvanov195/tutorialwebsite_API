import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const AnswerModel = {
	table: 'Answer',
	idField: 'AnswerID',
	mutableFields: [
		'AnswerText',
		'AnswerDatecreated',
		'AnswerQuestionID',
		'AnswerCorrect',
	],
	insertFields: [
		'AnswerText',
		'AnswerQuestionID',
		'AnswerCorrect',
	],

	buildReadQuery: (req) => {
		const { id: answerID } = req.params;
		const fields = [
			`${AnswerModel.idField}`,
			...AnswerModel.mutableFields,
		];

		const table = AnswerModel.table;
		let where = '';
		const parameters = {};

		if(answerID) {
			where += 'AND AnswerID = :AnswerID';
			parameters.AnswerID = parseInt(answerID);
		}
		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default AnswerModel;