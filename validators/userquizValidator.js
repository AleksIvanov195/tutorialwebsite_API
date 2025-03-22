import Joi from 'joi';

const userquizPostSchema = Joi.object({
	UserquizUsercontentstatusID : Joi.number().integer().valid(3).required(), // Temporary set to 3
	UserquizCompletiondate: Joi.date().iso(), // Temporary here
	UserquizQuizID: Joi.number().integer().required(),
	UserquizResult: Joi.number().integer().required(), // Temporary here
});

const completequizSchema = Joi.object({
	UserquizUsercontentstatusID : Joi.number().integer().valid(3).required(),
	UserquizCompletiondate: Joi.date().iso(),
	UserquizResult: Joi.number().integer().required(),
});

export const validateUserquizPost = (req, res, next) => {
	const { error } = userquizPostSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateCompleteQuiz = (req, res, next) => {
	const { error } = completequizSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};