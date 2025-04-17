import CourseContentModel from '../models/coursecontentModel.js';

const checkCourseCompletion = (model, database) => async (req, res, next) => {
	const userID = req.userID;
	const userCourseID = req.params.id;
	let courseID = '';

	try {
		// Get course id
		const getCourseIdQuery = `SELECT * FROM ${model.table} WHERE ${model.idField} = ?`;
		const [usercourse] = await database.execute(getCourseIdQuery, [userCourseID]);
		if (!usercourse) {
			return res.status(404).json({ message: 'User course record does not exist.' });
		}
		if (!usercourse[0].UsercourseCourseID) {
			return res.status(404).json({ message: 'Completing course failed, missing course ID.' });
		}
		courseID = usercourse[0].UsercourseCourseID;

		// Check if all course content is completed for the user
		const params = { UserID: userID, CourseID: courseID };

		// COUNT(*) = SUM(...) Compares the total count with the completed count.
		// If they are equal then return true
		const IsCourseContentCompletedQuery = `
			SELECT 
			COUNT(*) = SUM(
					CASE 
							WHEN (CoursecontentQuizID IS NOT NULL AND UserquizUsercontentstatusID = 3) 
								OR (CoursecontentLessonID IS NOT NULL AND UserlessonUsercontentstatusID = 3) 
							THEN 1 ELSE 0 
					END
			) AS AllContentCompleted
			FROM ${CourseContentModel.table}
			LEFT JOIN Lesson ON CoursecontentLessonID = LessonID
			LEFT JOIN Quiz ON CoursecontentQuizID = QuizID
			LEFT JOIN Userquiz ON UserquizQuizID = QuizID AND UserquizUserID = :UserID
			LEFT JOIN Userlesson ON UserlessonLessonID = LessonID AND UserlessonUserID = :UserID
			WHERE CoursecontentCourseID = :CourseID;
		`;
		const [record] = await database.execute(IsCourseContentCompletedQuery, params);
		if(!record[0].AllContentCompleted) {
			return res.status(403).json({ message: 'Forbidden: Not all course content is completed!' });
		}
		next();
	}catch(error) {
		console.error('Error while completing course: ', error);
		res.status(500).json({ message: 'Internal Server Error: Completing course failed.' });
	}
};

export default checkCourseCompletion;