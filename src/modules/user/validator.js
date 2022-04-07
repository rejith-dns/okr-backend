const Joi = require("joi-oid");

const emailSchema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .lowercase()
    .allow(null, ""),
});

const passwordSchema = Joi.object({ password: Joi.string().required(), token: Joi.string().required() });

const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .lowercase()
    .allow(null, ""),
    password: Joi.string().required(),
})

const loginSchema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .lowercase()
    .allow(null, ""),
    password: Joi.string().required(), 
})

const updateUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
})

module.exports = {
    sendEmail(req, res, next) {
        const result = emailSchema.validate(req.body);
        if (result.error != null) {
            return res.status(400).json({ status: 400, message: result.error.message });
        } else {
            next();
        }
    },
    resetPassword(req, res, next) {
        const result = passwordSchema.validate(req.body);
        if (result.error != null) {
            return res.status(400).json({ status: 400, message: result.error.message });
        } else {
            next();
        }
    },
    signup(req, res, next) {
        const result = signupSchema.validate(req.body);
        if (result.error != null) {
            return res.status(400).json({ status: 400, message: result.error.message });
        } else {
            next();
        }
    },
    login(req, res, next) {
        const result = loginSchema.validate(req.body);
        if (result.error != null) {
            return res.status(400).json({ status: 400, message: result.error.message });
        } else {
            next();
        }
    },
    updateUser(req, res, next) {
        const result = updateUserSchema.validate(req.body);
        if (result.error != null) {
            return res.status(400).json({ status: 400, message: result.error.message });
        } else {
            next();
        }
    }
};
