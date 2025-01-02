import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authenticateToken = (req, res, next) => {
	const token = req.cookies.accessToken;
	if (!token) {
		return res.status(401).json({ message: 'Access token missing' });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.userID = decodedToken.userID;
		req.userType = decodedToken.userType;
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({ message: 'Access token expired' });
		}
		return res.status(403).json({ message: 'Invalid access token', error });
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

export const authenticateRefreshToken = (req, res, next) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		return res.status(401).json({ message: 'Refresh token missing' });
	}

	try {
		const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		req.userID = decodedToken.userID;
		req.userType = decodedToken.userType;
		next();
	} catch (error) {
		return res.status(403).json({ message: 'Invalid refresh token', error });
	}
};

