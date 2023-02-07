import Joi from "@hapi/joi";

// Back end validation
// Register validation
export const registerValidation = (data) => {
  const validationSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return validationSchema.validate(data);
};

// Login validation
export const loginValidation = (data) => {
  const validationSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return validationSchema.validate(data);
};
