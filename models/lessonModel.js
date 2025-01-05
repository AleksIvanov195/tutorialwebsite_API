import { constructPreparedStatement, constructInsertQuery, parseRequestQuery } from './modelutils.js';

const LessonModel = {
	table: 'Lesson',
	idfield: 'LessonID',
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
			`${LessonModel.idfield}`,
			...LessonModel.mutableFields,
		];

		const table = LessonModel.table;
		let where = '';
		const parameters = {};


		const filter = parseRequestQuery(req, fields);

		// Construct the SQL query string and its params
		return constructPreparedStatement(fields,	table,	where,	parameters,	filter);
	},
	buildCreateQuery: (lessonData) => {
		lessonData.LessonPublicationstatusID = 1;
		console.log(lessonData)
		return constructInsertQuery(LessonModel.insertFields, LessonModel.table, lessonData);
	},
};

export default LessonModel;