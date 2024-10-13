import CourseAccessor from "../accessors/courseAccessor.js";

const getCourses = async (req, res) => {
	const courseID = req.params.courseID || null;
	const userID = req.params.userID || null;
	try {
			const userCourses = await CourseAccessor.getCourses(courseID, userID);

			if (!userCourses.length) return res.status(404).json({ message: 'No courses found.' });
		
			res.status(200).json(userCourses);

	} catch (error) {
			console.log('Error getting usercourses: ', error)
			res.status(500).json({ error: 'Internal Server Error' });
	}
};

const createCourse = async (req, res) => {
  const courseData = req.body;
  try {
    const result = await CourseAccessor.createCourse(courseData);
		const createdCourse = {
			CourseID: result.insertId,
			...courseData,
		};
    res.status(201).json({ 
			message: 'Course created successfully', 
			course: createdCourse
		});
  } catch (error) {
    console.log('Error creating course: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export {getCourses, createCourse};
