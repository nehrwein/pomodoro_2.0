const express = require('express');
const { PrismaClient } = require('../prisma/app/generated/prisma/client');
const { authenticateUser } = require('./auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all tasks and pomodoros of a user
router.get('/:userId', authenticateUser, async (req, res) => {
  const { userId } = req.params;

  if (req.userId !== userId) {
    return res.status(403).json({
      response: { message: 'Access denied' },
      success: false,
    });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ response: tasks, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Post a new task
router.post('/', authenticateUser, async (req, res) => {
  const { description, user } = req.body;

  // Validate request body
  if (!description || !user) {
    return res.status(400).json({ response: 'Description and user are required.', success: false });
  }

  try {
    const newTask = await prisma.task.create({
      data: { description, userId: user, completed: false },
    });
    res.status(201).json({ response: newTask, success: true });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ response: error.message, success: false });
  }
});

// Complete an existing task
router.patch('/:taskId/complete', authenticateUser, async (req, res) => {
  const { taskId } = req.params;
  const { completed, completedAt } = req.body;

  try {
    const completedTask = await prisma.task.update({
      where: { id: taskId },
      data: { completed, completedAt },
    });
    res.status(200).json({ response: completedTask, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Update the description of an existing task
router.patch('/:taskId/update', authenticateUser, async (req, res) => {
  const { taskId } = req.params;
  const { description } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { description },
    });
    res.status(200).json({ response: updatedTask, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Add a pomodoro
router.post('/:userId/pomodoro', authenticateUser, async (req, res) => {
  const { userId } = req.params;
  const { completedAt } = req.body;

  try {
    const newPomodoro = await prisma.pomodoro.create({
      data: { completedAt, userId },
    });
    res.status(201).json({ response: newPomodoro, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Delete a single task
router.delete('/:taskId', authenticateUser, async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await prisma.task.delete({ where: { id: taskId } });
    res.status(200).json({ response: deletedTask, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

module.exports = router;
