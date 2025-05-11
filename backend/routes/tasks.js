const express = require('express');
const { PrismaClient } = require('../prisma/app/generated/prisma/client');
const { authenticateUser } = require('./auth');

const router = express.Router();
const prisma = new PrismaClient();

//Todo is this working???
// Get all endpoints
router.get('/endpoints', (req, res) => {
  res.json({
    response: 'List of endpoints will be dynamically generated here.',
    success: true,
  });
});

// Get all tasks and pomodoros of a user
router.get('/tasks/:userId', authenticateUser, async (req, res) => {
  const { userId } = req.params;

  console.log('Authentifizierter Benutzer (Token):', req.userId);
  console.log('Angeforderte Benutzer-ID (URL):', userId);

  if (req.userId !== userId) {
    console.log('Zugriff verweigert: Benutzer-ID aus Token und URL stimmen nicht überein.');
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
    console.log('Gefundene Aufgaben:', tasks);
    res.status(200).json({ response: tasks, success: true });
  } catch (error) {
    console.error('Fehler beim Abrufen der Aufgaben:', error);
    res.status(400).json({ response: error, success: false });
  }
});

// Post a new task
router.post('/tasks', authenticateUser, async (req, res) => {
  const { description, user } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: { description, userId: user },
    });
    res.status(201).json({ response: newTask, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Complete an existing task
router.patch('/tasks/:taskId/complete', authenticateUser, async (req, res) => {
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
router.patch('/tasks/:taskId/update', authenticateUser, async (req, res) => {
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
router.post('/tasks/:userId/pomodoro', authenticateUser, async (req, res) => {
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
router.delete('/tasks/:taskId', authenticateUser, async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await prisma.task.delete({ where: { id: taskId } });
    res.status(200).json({ response: deletedTask, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

module.exports = router;
