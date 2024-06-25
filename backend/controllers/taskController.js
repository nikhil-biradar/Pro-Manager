const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate, status, sharedWith } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      sharedWith,
      createdBy: req.user.userId
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while fetching tasks' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const task = await Task.findOneAndUpdate({ _id: id, createdBy: req.user.userId }, updates, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, createdBy: req.user.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while deleting the task' });
  }
};