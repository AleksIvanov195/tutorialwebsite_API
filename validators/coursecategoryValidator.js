import Joi from 'joi';

const coursecategorySchema = Joi.object({
	CoursecategoryName: Joi.string().required(),
});

export const validateCoursecategory = (req, res, next) => {
	const { error } = coursecategorySchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};