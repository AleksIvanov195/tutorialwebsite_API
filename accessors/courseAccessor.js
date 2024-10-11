import database from '../database.js';
import CourseModel from '../models/courseModel.js';

const CourseAccessor = {
    getCourses: async (courseID, userID) => {
        const { query, params } = CourseModel.buildReadQuery(courseID, userID);
        try {
            const [courses] = await database.execute(query, params);
						console.log(courses)
            return courses;					
        } catch (error) {
					console.log('Error getting usercourses: ', error);
        }
    }
};

export default CourseAccessor;
