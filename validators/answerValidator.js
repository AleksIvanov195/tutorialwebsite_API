import Joi from 'joi';

const answerPostSchema = Joi.object({
	AnswerText: Joi.string().min(3).max(255).required(),
	AnswerCorrect: Joi.boolean().required(),
	AnswerQuestionID: Joi.number().integer().required(),
});

const answerPutSchema = Joi.object({
	AnswerText: Joi.string().min(3).max(255).required(),
	AnswerCorrect: Joi.alternatives().try(Joi.boolean(), Joi.number().valid(0, 1)).required(),
});

export const validateAnswerPost = (req, res, next) => {
	const { error } = answerPostSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};
export const validateAnswerPut = (req, res, next) => {
	const { error } = answerPutSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};