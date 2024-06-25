require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("DB failed to connect", error));

const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Backend server running at port ${PORT}`);
});
