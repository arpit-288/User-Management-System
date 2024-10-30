import joi from 'joi';


// User Registration Schema
const registerUserSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    role: joi.string().valid('admin', 'user').default('user')

});

// Login Validation Schema
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});

//   Update User Validation Schema
const updateUserSchema = joi.object({
    name: joi.string().min(3).max(30),
    email: joi.string().email(),
    password: joi.string().min(8),
    role: joi.string().valid('user', 'admin')
});

export { registerUserSchema, loginSchema, updateUserSchema }