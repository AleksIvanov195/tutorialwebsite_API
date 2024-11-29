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
		req.userType = decoded.userType;
		next();
	} catch (error) {
		return res.status(403).json({ message: 'Invalid access token' });
	}
};

export const authoriseRoles = (roles = []) => (req, res, next) => {
	if (roles.length === 0) {
		return next();
	}
	if (!roles.includes(req.userType)) {
		return res.status(403).json({ message: 'Forbidden: You do not have the required role to access this resource.' });
	}

	next();
};

