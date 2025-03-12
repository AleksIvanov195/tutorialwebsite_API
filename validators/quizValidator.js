import Joi from 'joi';

const updateNameDescriptionSchema = Joi.object({
	QuizName: Joi.string().min(3).max(255).required(),
	QuizDescription: Joi.string().min(10).max(2000).required(),
});

const updateContentStatusSchema = Joi.object({
	QuizPublicationstatusID: Joi.number().integer().required(),
});

const updateAllSchema = Joi.object({
	QuizName: Joi.string().min(3).max(255).required(),
	QuizDescription: Joi.string().min(10).max(2000).required(),
	QuizPublicationstatusID: Joi.number().integer().required(),
});

export const validateQuizNameDescription = (req, res, next) => {
	const { error } = updateNameDescriptionSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateQuizContentStatus = (req, res, next) => {
	const { error } = updateContentStatusSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateQuiz = (req, res, next) => {
	const { error } = updateAllSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};