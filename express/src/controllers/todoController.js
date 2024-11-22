const Todo = require("../models/todo");

// Get all to-dos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch to-dos" });
    }
};

// Get a single to-do by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: "To-do not found" });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch to-do" });
    }
};

// Create a new to-do
exports.createTodo = async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: "Failed to create to-do" });
    }
};

// Update a to-do
exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedTodo)
            return res.status(404).json({ error: "To-do not found" });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(400).json({ error: "Failed to update to-do" });
    }
};

// Delete a to-do
exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo)
            return res.status(404).json({ error: "To-do not found" });
        res.status(200).json({ message: "To-do deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete to-do" });
    }
};
