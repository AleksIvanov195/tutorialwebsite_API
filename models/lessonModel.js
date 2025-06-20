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
		const { id: lessonID } = req.params;
		const fields = [
			`${LessonModel.idField}`,
			...LessonModel.mutableFields,
			'PublicationstatusName AS LessonPublicationstatusName',
		];

		const table = `${LessonModel.table}
		INNER JOIN Publicationstatus ON LessonPublicationstatusID = PublicationstatusID`;
		let where = '';
		const parameters = {};

		if(lessonID) {
			where += 'AND LessonID = :LessonID';
			parameters.LessonID = parseInt(lessonID);
		}

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