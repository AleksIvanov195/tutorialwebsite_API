import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const LessonModel = {
	table: 'Lesson',
	idField: 'LessonID',
	mutableFields: [
		'LessonName',
		'LessonDescription',
		'LessonContentJSON',
		'LessonPublicationstatusID',
		'LessoncreatorUserID',
	],
	insertFields: [
		'LessonName',
		'LessonDescription',
		'LessonContentJSON',
		'LessonPublicationstatusID',
		'LessoncreatorUserID',
	],
	creatorField: 'LessoncreatorUserID',

	buildReadQuery: (req) => {
		const userID = req.userID;
		const fields = [
			`${LessonModel.idField}`,
			...LessonModel.mutableFields,
		];

		const table = LessonModel.table;
		let where = '';
		const parameters = {};

		if (req.path.includes('/mylessons')) {
			// Show lessons created by the specified creator.
			where += 'AND LessoncreatorUserID = :LessoncreatorUserID';
			parameters.LessoncreatorUserID = parseInt(userID);
		}


		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default LessonModel;