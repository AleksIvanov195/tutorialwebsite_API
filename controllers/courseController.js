import CourseAccessor from "../accessors/courseAccessor.js";

const getCourses = async (req, res) => {
	try {
			const courses = await CourseAccessor.getCourses(req);
			if (!courses.length || courses.length === 0) return res.status(404).json({ message: 'No courses found.' });
		
			res.status(200).json(courses);

	} catch (error) {
			console.log('Error getting courses: ', error)
			res.status(500).json({ error: 'Internal Server Error'});
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
    res.status(500).json({ error:'Internal Server Error',});
  }
}

export {getCourses, createCourse};
