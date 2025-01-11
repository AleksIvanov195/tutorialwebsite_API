import { constructPreparedStatement, parseRequestQuery } from './modelutils.js';

const LessonModel = {
	table: 'Lesson',
	idField: 'LessonID',
	mutableFields: [
		'LessonName',
		'LessonDescription',
		'LessonContentJSON',
		'LessonPublicationstatusID',
	],
	insertFields: [
		'LessonName',
		'LessonDescription',
		'LessonContentJSON',
		'LessonPublicationstatusID',
	],

	buildReadQuery: (req) => {
		const fields = [
			`${LessonModel.idField}`,
			...LessonModel.mutableFields,
		];

		const table = LessonModel.table;
		let where = '';
		const parameters = {};


		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
};

export default LessonModel;