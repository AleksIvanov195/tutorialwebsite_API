import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
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
			const { result } = await this.accessor.insertData(newUser);

			const accessToken = jwt.sign({ userID: result.insertId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
			const refreshToken = jwt.sign({ userID: result.insertId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
			res.status(201).json({
				message: 'Success Registering',
				accessToken,
				refreshToken,
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
			const accessToken = jwt.sign({ userID: user.UserID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
			const refreshToken = jwt.sign({ userID: user.UserID }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
			res.json({
				message: 'Login successful.',
				accessToken,
				refreshToken,
			});
		}catch (error) {
			console.log('Error logging: ', error);
			res.status(500).json({ error:'Internal Server Error' });
		}
	}

	async refresh(req, res) {
		const { refreshToken } = req.body;
		try {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

			const users = await this.accessor.fetchData({ body: { userID: decoded.userID } });
			const user = users && users.length > 0 ? users[0] : null;

			if (!user) {
				return res.status(404).json({ error: 'User not found.' });
			}

			const newAccessToken = jwt.sign({ userID: user.UserID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

			res.json({ accessToken: newAccessToken });
		} catch (error) {
			console.log('Error refreshing token:', error);
			res.status(403).json({ error: 'Invalid or expired refresh token.' });
		}
	}

}

export default AuthController;