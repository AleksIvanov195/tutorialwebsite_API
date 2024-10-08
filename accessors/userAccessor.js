import database from "../database.js"
import model from "../models/userModel.js";

const getUserById = async (id) =>{
	try{
		const query = model.getUserByIdQuery(id);
		const [rows] = await database.execute(query, [id])
		const user = rows[0];
		return user;
	}catch (error){
		console.log('Error getting user by ID: ', error);

	}
}

const getUserByEmail = async (email) =>{
//	try{
		//const query = model.getUserByEmailQuery(email)
//	}
}

const createNewUser = async (userData) =>{

}

export {getUserById};
