import UserCourseAccessor from "../accessors/usercourseAccessor.js";

const getUserCourses = async (req, res) => {
	try {
			const userCourses = await UserCourseAccessor.getUserCourses(req);

			if (!userCourses.length) return res.status(404).json({ message: 'No usercourses found.' });
		
			res.status(200).json(userCourses);

	} catch (error) {
			console.log('Error getting usercourses: ', error)
			res.status(500).json({ error: 'Internal Server Error' });
	}
};

export {getUserCourses,};
