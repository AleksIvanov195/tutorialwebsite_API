import Joi from 'joi';

const usercontentstatusSchema = Joi.object({
	UsercontentstatusName : Joi.string().min(3).max(255).required(),
});


export const validateUsercontentstatus = (req, res, next) => {
	const { error } = usercontentstatusSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};
