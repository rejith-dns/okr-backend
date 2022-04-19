const Joi = require("joi-oid");

const assignNodeSchema = Joi.object({
    nodeId: Joi.string().required(),
    users:Joi.array().items(Joi.string().length(24)).required(),
    title:Joi.string().required(),
    ObjectiveId:Joi.string().length(24).required(),
});


module.exports = {
    assignNode(req, res, next) {
        const result = assignNodeSchema.validate(req.body);
        if (result.error != null) {
            return res.status(400).json({ status: 400, message: result.error.message });
        } else {
            next();
        }
    },
};
