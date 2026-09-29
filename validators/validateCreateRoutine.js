// Validation middleware for creating a routine

import Joi from "joi";

const validateCreateRoutine = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    type: Joi.string()
      .valid(
        "medication",
        "exercise",
        "hydration",
        "sleep",
        "nutrition",
        "health_check",
        "appointment",
        "other"
      )
      .required(),
    description: Joi.string().min(5).max(1000).required(),
    frequency: Joi.string()
      .valid(
        "daily",
        "weekly",
        "monthly",
        "forthnightly",
        "every hour",
        "every two hours",
        "every six hours",
        "every eight hours"
      )
      .required(),
    time: Joi.date().iso().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    routineStatus: Joi.boolean().truthy("true").falsy("false").required(),
  });
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((d) => d.message).join("; ");
      return res.status(400).json({ error: messages });
    }
    next();
  } catch (ex) {
    console.error("Create routine validation error:", ex);
    return res.status(400).json({ error: "Invalid input for createRoutine." });
  }
};

export default validateCreateRoutine;
