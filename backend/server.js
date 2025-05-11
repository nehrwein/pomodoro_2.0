const express = require('express');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Pomodoro App Backend!');
});

//NOTE - This is currently not working for express 5 https://www.npmjs.com/package/express-list-endpoints
// Get all endpoints
app.get('/endpoints', (req, res) => {
  res.json({
    response: 'List of endpoints will be dynamically generated here.',
    success: true,
  });
});

app.use('/auth', authRoutes.router);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
