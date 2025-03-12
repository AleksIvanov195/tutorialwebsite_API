import Joi from 'joi';

const questionPutSchema = Joi.object({
	QuestionText: Joi.string().max(255).required(),
	QuestionType: Joi.string().min(3).max(50).required(),
	QuestionFeedbacktext: Joi.string().max(255).required(),
});

const questionReorderSchema = Joi.object({
	QuestionOrdernumber: Joi.number().integer().required(),
});

export const validateQuestionPut = (req, res, next) => {
	const { error } = questionPutSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateQuestionReorderPut = (req, res, next) => {
	const { error } = questionReorderSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};