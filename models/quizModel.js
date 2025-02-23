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
		let fields = [
			`${quizModel.idField}`,
			...quizModel.mutableFields,
			'PublicationstatusName AS QuizPublicationstatusName',
		];

		let table = `${quizModel.table}
		INNER JOIN Publicationstatus ON QuizPublicationstatusID = PublicationstatusID`;
		let where = '';
		const parameters = {};
		let groupBy = '';

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
			fields = [];
			fields.push('QuizID', 'QuestionID', 'QuestionText', 'QuestionFeedbacktext', 'QuestionType', 'QuestionOrdernumber');
			fields.push(`
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'AnswerID', AnswerID,
            'AnswerText', AnswerText,
            'AnswerCorrect', AnswerCorrect
          )
        ) AS Answers
      `);

			table += `
        LEFT JOIN Question ON QuizID = QuestionQuizID
        LEFT JOIN Answer ON QuestionID = AnswerQuestionID
      `;
			groupBy = 'QuizID, QuestionID';
		}

		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter, groupBy);
	},
};

export default quizModel;