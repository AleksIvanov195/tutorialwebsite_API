import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
class AuthController {
	constructor(accessor) {
		this.accessor = accessor;
	}
	async register(req, res) {
		// Data should contain user attributes
		const data = req.body;

		// Check if user exists
		const existingUser = await this.accessor.fetchData(req);
		if (existingUser && existingUser.length > 0) {
			return res.status(400).json({ error: 'User already exists.' });
		}

		try{
			// Hash the password
			const hashedPassword = await bcrypt.hash(data.UserPassword, 10);

			// Insert new user
			const newUser = {
				...data,
				UserPassword: hashedPassword,
			};
			const { result } = await this.accessor.insertData(newUser);

			// Generate jwt tokens
			const accessToken = jwt.sign({ userID: result.insertId, userType: newUser.UserType }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
			const refreshToken = jwt.sign({ userID: result.insertId, userType: newUser.UserType }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

			res.cookie('accessToken', accessToken, {
				httpOnly: true,
				sameSite: 'Strict',
				maxAge: 10 * 60 * 1000,
			});

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				sameSite: 'Strict',
				maxAge: 24 * 60 * 60 * 1000,
			});

			res.status(201).json({
				message: 'Success Registering',
			});
		}catch (error) {
			console.log('Error registering: ', error);
			res.status(500).json({ error:'Internal Server Error' });
		}
	}

	async login(req, res) {
		// Data should contain UserEmail and UserPassword
		const data = req.body;

		try{
			// Get user
			const result = await this.accessor.fetchData(req);
			if(!result || result.length === 0) {
				return res.status(404).json({ error: 'User not found.' });
			}
			const user = result[0];
			// Verify password
			const isPasswordValid = await bcrypt.compare(data.UserPassword, user.UserPassword);
			if (!isPasswordValid) {
				return res.status(401).json({ error: 'Incorrect password.' });
			}
			// Generate JWT tokens
			const accessToken = jwt.sign({ userID: user.UserID, userType: user.UserType }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
			const refreshToken = jwt.sign({ userID: user.UserID, userType: user.UserType }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

			res.cookie('accessToken', accessToken, {
				httpOnly: true,
				sameSite: 'Strict',
				maxAge: 10 * 60 * 1000,
			});

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				sameSite: 'Strict',
				maxAge: 24 * 60 * 60 * 1000,
			});
			console.log(req.cookies)
			res.json({
				message: 'Login successful.',
			});
		}catch (error) {
			console.log('Error logging: ', error);
			res.status(500).json({ error:'Internal Server Error' });
		}
	}

	async refresh(req, res) {
		// Get Refresh token from req
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			return res.status(401).json({ error: 'No refresh token.' });
		}
		try {

			// Verify the refresh token
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

			// Get the user
			const result = await this.accessor.fetchData({ body: { userID: decoded.userID } });
			if (!result || result.length === 0) {
				return res.status(404).json({ error: 'User not found.' });
			}
			const user = result[0];

			// Generate new access token
			const newAccessToken = jwt.sign({ userID: user.UserID, userType: user.UserType }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

			res.cookie('accessToken', newAccessToken, {
				httpOnly: true,
				sameSite: 'Strict',
				maxAge: 10 * 60 * 1000,
			});

			res.json({ message: 'Refresh successful.' });
		} catch (error) {
			console.log('Error refreshing token:', error);
			res.status(403).json({ error: 'Invalid or expired refresh token.' });
		}
	}

}

export default AuthController;