import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const authRegisterSchema = Joi.object({
	UserName: Joi.string().min(3).max(25).required(),
	UserEmail: Joi.string().email().required(),
	UserPassword: Joi.string().min(3).max(100).required(),
	UserType: Joi.string().required(),
});

const authLoginSchema = Joi.object({
	UserEmail: Joi.string().email().required(),
	UserPassword: Joi.string().min(3).max(100).required(),
});

export const validateRegister = (req, res, next) => {
	const { error } = authRegisterSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateLogin = (req, res, next) => {
	const { error } = authLoginSchema.validate(req.body);
	if(error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};