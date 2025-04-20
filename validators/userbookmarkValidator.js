import Joi from 'joi';

const userbookmarkSchema = Joi.object({
	UserbookmarkCourseID : Joi.number().integer().required(),
});


export const validateUserbookmark = (req, res, next) => {
	const { error } = userbookmarkSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};
