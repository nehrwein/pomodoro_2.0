const express = require('express');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Pomodoro App Backend!');
});

//Todo add list
// Get all endpoints
app.get('/endpoints', (req, res) => {
  res.json({
    response: 'List of endpoints will be dynamically generated here.',
    success: true,
  });
});

app.use('/auth', authRoutes.router);
app.use('/tasks', taskRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
