const Task = require("../models/model.task");
const { createTaskSchema, taskSchema } = require("../validators/taskValidator");

const createTask = async (req, res) => {
    try {
        const { error } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: "error", message: error.details[0].message });
        }

        const newTask = await Task.create({title: req.body.title});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllTasks = async (req, res) => {
    try {
        await Task.find({}).then((tasks) => {
            res.json(tasks);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const changeTaskStatus = async (req, res) => {
    try {

        const { error } = taskSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ status: "error", message: error.details[0].message });
        }

        const { itemId } = req.params;
        const task = await Task.findById(itemId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        task.status = task.status === "new" ? "done" : "new";
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { error } = taskExistsSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ status: "error", message: error.details[0].message });
        }

        const { itemId } = req.params;
        const task = await Task.findByIdAndDelete(itemId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    changeTaskStatus,
    deleteTask
}
