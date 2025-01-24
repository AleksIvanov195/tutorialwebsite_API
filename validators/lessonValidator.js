import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const updateNameDescriptionSchema = Joi.object({
	LessonName: Joi.string().min(3).max(255).required(),
	LessonDescription: Joi.string().min(10).max(2000).required(),
});

const updateContentStatusSchema = Joi.object({
	LessonContentJSON: Joi.string().required(),
	LessonPublicationstatusID: Joi.number().integer().required(),
});

const updateAllSchema = Joi.object({
	LessonName: Joi.string().min(5).max(255).required(),
	LessonDescription: Joi.string().min(10).max(2000).required(),
	LessonContentJSON: Joi.string().required(),
	LessonPublicationstatusID: Joi.number().integer().required(),
});

export const validateLessonNameDescription = (req, res, next) => {
	const { error } = updateNameDescriptionSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateLessonContentStatus = (req, res, next) => {
	const { error } = updateContentStatusSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};

export const validateLesson = (req, res, next) => {
	const { error } = updateAllSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};