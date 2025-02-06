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
		const { id: quizID } = req.params;
		const fields = [
			`${quizModel.idField}`,
			...quizModel.mutableFields,
		];

		let table = quizModel.table;
		let where = '';
		const parameters = {};

		if (quizID) {
			where += 'AND QuizID = :QuizID';
			parameters.QuizID = parseInt(quizID);
		}

		if (req.path.includes('/myquizzes')) {
			// Show quizzes created by the specified creator.
			where += 'AND QuizcreatorUserID = :QuizcreatorUserID';
			parameters.QuizcreatorUserID = parseInt(userID);
		}

		if (req.path.includes('questions-answers')) {
			// Show quizzes created by the specified creator.
			fields.push('QuestionID', 'QuestionText', 'QuestionFeedbacktext', 'QuestionType', 'AnswerID', 'AnswerText', 'AnswerCorrect');
			table += `
			LEFT JOIN Question ON QuizID = QuestionQuizID
			LEFT JOIN Answer ON QuestionID = AnswerQuestionID
			`;
		}

		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default quizModel;