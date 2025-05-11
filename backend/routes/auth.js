const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../prisma/app/generated/prisma/client');
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();

const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET || 'your_secret_key';
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

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

    const token = generateToken(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: 'User could not be created.', errorMessage: error });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.', errorMessage: error });
  }
});

const authenticateUser = (req, res, next) => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return res.status(401).json({
      response: { message: 'Authorization token missing' },
      success: false,
    });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'your_secret_key';
    const decoded = jwt.verify(accessToken, secretKey);
    req.userId = decoded.userId; // Benutzer-ID für nachfolgende Middleware verfügbar machen
    next();
  } catch (error) {
    res.status(401).json({
      response: { message: 'Invalid or expired token' },
      success: false,
    });
  }
};

// Exportiere die Middleware für die Verwendung in anderen Routen
module.exports = { router, authenticateUser };