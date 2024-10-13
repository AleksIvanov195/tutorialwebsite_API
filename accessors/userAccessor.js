import database from "../database.js"
import model from "../models/userModel.js";

const getUserByID = async (userID) =>{
	try{
		const query = model.getUserByID(userID);
		const [rows] = await database.execute(query, [userID])
		const user = rows[0];
		return user;
	}catch (error){
		console.log('Error getting user by ID: ', error);

	}
}


export {getUserByID};
