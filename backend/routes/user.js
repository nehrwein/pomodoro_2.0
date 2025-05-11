const express = require('express');
const { PrismaClient } = require('../prisma/app/generated/prisma/client');
const { authenticateUser } = require('./auth');

const router = express.Router();
const prisma = new PrismaClient();

// Update Pomodoro timer settings
router.patch('/:userId/settings', authenticateUser, async (req, res) => {
  const { userId } = req.params;
  const { workMinutes, shortBreakMinutes, longBreakMinutes } = req.body;

  try {
    const queriedUser = await prisma.user.update({
      where: { id: userId },
      data: { workMinutes, shortBreakMinutes, longBreakMinutes },
    });

    if (!queriedUser) {
      res.status(404).json({ response: 'No user found with this Id', success: false });
    } else {
      res.status(200).json({ response: { workMinutes, shortBreakMinutes, longBreakMinutes }, success: true });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Delete a user and all their tasks
router.delete('/:userId', authenticateUser, async (req, res) => {
  const { userId } = req.params;

  try {
    const queriedUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!queriedUser) {
      return res.status(404).json({ response: 'No user found with this Id', success: false });
    }

    const deletedTasks = await prisma.task.deleteMany({ where: { userId: queriedUser.id } });
    const deletedUser = await prisma.user.delete({ where: { id: queriedUser.id } });

    res.status(200).json({ response: { deletedUser, deletedTasks }, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

module.exports = router;
