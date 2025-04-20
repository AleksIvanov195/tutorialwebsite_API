import Joi from 'joi';

const usercoursePostSchema = Joi.object({
	UsercourseCourseID : Joi.number().integer().required(),
});

const completecourseSchema = Joi.object({
	UsercourseUsercontentstatusID : Joi.number().integer().valid(3).required(),
	UsercourseCompletiondate : Joi.date().iso(),
});

export const validateUsercoursePost = (req, res, next) => {
	const { error } = usercoursePostSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateCompleteCourse = (req, res, next) => {
	const { error } = completecourseSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};