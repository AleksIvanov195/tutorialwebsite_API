import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const courseSchema = Joi.object({
	CourseName: Joi.string().min(3).max(255).required(),
	CourseDescription: Joi.string().min(10).max(2000).required(),
	CourseCategory: Joi.string().min(3).max(100).required(),
	CourseCoursepublicationstatusID: Joi.number().integer().required(),
});

export const validateCourse = (req, res, next) => {
	const { error } = courseSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};