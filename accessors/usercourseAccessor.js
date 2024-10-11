import database from '../database.js';
import UserCourseModel from '../models/usercourseModel.js';

const UserCourseAccessor = {
    getUserCourses: async (usercourseID, userID, statusID) => {
        const { query, params } = UserCourseModel.buildReadQuery(usercourseID, userID, statusID);
        try {
            const [usecourses] = await database.execute(query, params);
            return usecourses;
						
        } catch (error) {
					console.log('Error getting usercourses: ', error);
        }
    }
};

export default UserCourseAccessor;
