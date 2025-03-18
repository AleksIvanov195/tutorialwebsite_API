import Joi from 'joi';

// Other propteries
const completequizSchema = Joi.object({
	UserquizUsercontentstatusID : Joi.number().integer().valid(3).required(),
	UserquizCompletiondate: Joi.date().iso(),
	UserquizQuizID: Joi.number().integer().required(),
	UserquizResult: Joi.number().integer().required(),
});

export const validateCompleteQuiz = (req, res, next) => {
	const { error } = completequizSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};