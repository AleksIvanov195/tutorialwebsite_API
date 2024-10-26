import database from '../database.js';
import CourseModel from '../models/courseModel.js';

const CourseAccessor = {
    getCourses: async (req) => {
        const { query, params } = CourseModel.buildReadQuery(req);
        try {
            const [courses] = await database.execute(query, params);
						console.log(courses)
            return courses;					
        } catch (error) {
					console.log('Error getting usercourses: ', error);
        }
    },
		createCourse: async (courseData) => {
			const { query, params } = CourseModel.buildCreateQuery(courseData);
			try {
				const [result] = await database.execute(query, params);
				console.log(result);
				return result;
			} catch (error) {
				console.log('Error creating course: ', error);
			}
		},
};

export default CourseAccessor;
