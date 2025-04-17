import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const courseSchema = Joi.object({
	CourseName: Joi.string().min(3).max(255).required(),
	CourseDescription: Joi.string().min(10).max(2000).required(),
	CourseCoursecategoryID: Joi.number().integer().required(),
	CoursePublicationstatusID: Joi.number().integer().required(),
});

const updateContentStatusSchema = Joi.object({
	CoursePublicationstatusID: Joi.number().integer().required(),
});

const courseEdit = Joi.object({
	CourseName: Joi.string().min(3).max(255).required(),
	CourseDescription: Joi.string().min(10).max(2000).required(),
	CourseCoursecategoryID: Joi.number().integer().required(),
});

export const validateCourse = (req, res, next) => {
	const { error } = courseSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateCourseContentStatus = (req, res, next) => {
	const { error } = updateContentStatusSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateCourseEdit = (req, res, next) => {
	const { error } = courseEdit.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};