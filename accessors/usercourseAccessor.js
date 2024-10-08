import database from '../database.js';
import UserCourseModel from '../models/usercourseModel.js';

const UserCourseAccessor = {
    getUserCourses: async (userId, statusId) => {
        const { query, params } = UserCourseModel.buildReadQuery(userId, statusId);
        try {
            const [usecourses] = await database.execute(query, params);
            return usecourses;
						
        } catch (error) {
					console.log('Error getting usercourses: ', error);
        }
    }
};

export default UserCourseAccessor;
