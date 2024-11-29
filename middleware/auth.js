import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authenticateToken = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'Access token missing' });
	}

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.userID = decoded.userID;
		next();
	} catch (error) {
		return res.status(403).json({ message: 'Invalid access token' });
	}
};

