import Joi from 'joi';

const userlessonPostSchema = Joi.object({
	UserlessonUsercontentstatusID : Joi.number().integer().valid(3).required(), // Temporary set to 3
	UserlessonCompletiondate: Joi.date().iso(), // Temporary here
	UserlessonLessonID: Joi.number().integer().required(),
});

const completelessonSchema = Joi.object({
	UserlessonUsercontentstatusID : Joi.number().integer().valid(3).required(),
	UserlessonCompletiondate: Joi.date().iso(),
});

export const validateUserlessonPost = (req, res, next) => {
	const { error } = userlessonPostSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateCompleteLesson = (req, res, next) => {
	const { error } = completelessonSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};