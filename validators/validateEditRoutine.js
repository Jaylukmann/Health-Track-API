// Validation middleware for editing a routine

import Joi from "joi";

const validateEditRoutine = (req, res, next) => {
  const paramsSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });

  const bodySchema = Joi.object({
    title: Joi.string().min(3),
    type: Joi.string().valid(
      "medication",
      "exercise",
      "hydration",
      "sleep",
      "nutrition",
      "health_check",
      "appointment",
      "other"
    ),
    description: Joi.string().allow("").max(1000),
    frequency: Joi.string().valid(
      "daily",
      "weekly",
      "monthly",
      "forthnightly",
      "every hour",
      "every two hours",
      "every six hours",
      "every eight hours"
    ),
    time: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    routineStatus: Joi.boolean().optional(),
  }).min(1);

  const paramsError = paramsSchema.validate(req.params, { abortEarly: false }).error;
  if (paramsError) {
    return res.status(400).json({ error: paramsError.details[0].message });
  }

  const bodyError = bodySchema.validate(req.body, { abortEarly: false }).error;
  if (bodyError) {
    const messages = bodyError.details.map((d) => d.message).join("; ");
    return res.status(400).json({ error: messages });
  }

  next();
};

export default validateEditRoutine;
