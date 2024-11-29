import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthController {
	constructor(accessor) {
		this.accessor = accessor;
	}
	async register(req, res) {
		const data = req.body;
		const existingUser = await this.accessor.fetchData(req);
		if (existingUser && existingUser.length > 0) {
			return res.status(400).json({ error: 'User already exists.' });
		}
		try{
			const hashedPassword = await bcrypt.hash(data.UserPassword, 10);
			const newUser = {
				...data,
				UserPassword: hashedPassword,
			};
			const { result, idField } = await this.accessor.insertData(newUser);
			const createdData = {
				[idField]: result.insertId,
				...data,
			};
			res.status(201).json({
				message: 'Success Posting',
				course: createdData,
			});
		}catch (error) {
			console.log('Error registering: ', error);
			res.status(500).json({ error:'Internal Server Error' });
		}
	}

	async login(req, res) {
		const data = req.body;
		try{
			const user = await this.accessor.fetchData(req);
			if(!user) {
				return res.status(404).json({ error: 'User not found.' });
			}
			const isPasswordValid = await bcrypt.compare(data.UserPassword, user[0].UserPassword);
			if (!isPasswordValid) {
				return res.status(401).json({ error: 'Incorrect password.' });
			}
			res.json({
				message: 'Login successful.',
				user: user,
			});
		}catch (error) {
			console.log('Error logging: ', error);
			res.status(500).json({ error:'Internal Server Error' });
		}
	}

}

export default AuthController;