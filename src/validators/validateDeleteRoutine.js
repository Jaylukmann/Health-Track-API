// Validation middleware for deleting a routine

import Joi from "joi";

const validateDeleteRoutine = (req, res, next) => {
	const schema = Joi.object({
		id: Joi.string().hex().length(24).required(),
	});

	const { error } = schema.validate(req.params);
	if (error) return res.status(400).json({ error: error.details[0].message });

	next();
};

export default validateDeleteRoutine;
