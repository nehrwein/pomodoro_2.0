const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../prisma/app/generated/prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User could not be created.', errorMessage: error });
  }
});

module.exports = router;
