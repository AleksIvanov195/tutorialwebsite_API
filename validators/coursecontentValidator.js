import Joi from 'joi';

const coursecontentPostSchema = Joi.object({
	CoursecontentCourseID: Joi.number().integer().required(),
	CoursecontentLessonID: Joi.optional().empty(''),
	CoursecontentQuizID: Joi.optional().empty(''),
	CoursecontentOrder: Joi.number().integer().required(),
});

const coursecontentReorderSchema = Joi.object({
	CoursecontentOrder: Joi.required(),
});


export const validateCoursecontentPost = (req, res, next) => {
	const { error } = coursecontentPostSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateCoursecontentReorder = (req, res, next) => {
	const { error } = coursecontentReorderSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};