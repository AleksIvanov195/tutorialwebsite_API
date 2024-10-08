import UserCourseAccessor from "../accessors/usercourseAccessor.js";

const getUserCourses = async (req, res) => {

	const userId = req.params.userId;
	const statusId = req.params.statusId || null;

	try {
			const userCourses = await UserCourseAccessor.getUserCourses(userId, statusId);

			if (!userCourses.length) return res.status(404).json({ message: 'No courses found.' });
		
			res.status(200).json(userCourses);

	} catch (error) {
			console.log('Error getting usercourses: ', error)
			res.status(500).json({ error: 'Internal Server Error' });
	}
};

export {getUserCourses,};
