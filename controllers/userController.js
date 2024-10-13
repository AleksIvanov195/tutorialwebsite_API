import { getUserByID } from "../accessors/userAccessor.js";

const getUser = async (req, res) =>{
	const userID = req.params.userID;

	try{
		const user = await getUserByID(userID);
		if(!user)return res.status(404).json({ message: 'User not found'});

		res.status(200).json(user);

	}catch (error){
		console.log('Error getting user: ', error)
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

export {getUser,};