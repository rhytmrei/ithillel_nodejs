const { createTask, getAllTasks, changeTaskStatus, deleteTask } = require("../services/service.task");

module.exports = (app) => {
    app.post('/items', createTask);
    app.get('/items', getAllTasks);
    app.put('/items/:itemId', changeTaskStatus);
    app.delete('/items/:itemId', deleteTask);
}

