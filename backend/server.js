const express = require('express');
const authRoutes = require('./routes/signUp');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Pomodoro App Backend!');
});
app.use('/signup', authRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
