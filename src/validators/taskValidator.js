const Joi = require("joi");
const mongoose = require("mongoose");

const createTaskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required()
});

const objectIdSchema = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid task ID");
    }
    return value;
}, "MongoDB Object Id validation");

const taskSchema = Joi.object({
    itemId: objectIdSchema.required()
});

module.exports = {
    createTaskSchema,
    taskSchema
};
