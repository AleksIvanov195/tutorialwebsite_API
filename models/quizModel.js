import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const quizModel = {
	table: 'Quiz',
	idField: 'QuizID',
	mutableFields: [
		'QuizName',
		'QuizDescription',
		'QuizDatecreated',
		'QuizPublicationstatusID',
		'QuizcreatorUserID',
	],
	insertFields: [
		'QuizName',
		'QuizDescription',
		'QuizPublicationstatusID',
		'QuizcreatorUserID',
	],
	creatorField: 'QuizcreatorUserID',

	buildReadQuery: (req) => {
		const userID = req.userID;
		const fields = [
			`${quizModel.idField}`,
			...quizModel.mutableFields,
		];

		const table = quizModel.table;
		let where = '';
		const parameters = {};

		if (req.path.includes('/myquizzes')) {
			// Show quizzes created by the specified creator.
			where += 'AND QuizcreatorUserID = :QuizcreatorUserID';
			parameters.QuizcreatorUserID = parseInt(userID);
		}


		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default quizModel;