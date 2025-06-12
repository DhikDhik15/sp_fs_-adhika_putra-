require('dotenv').config();
const express = require('express');
const { Server } =require('socket.io');
const cors = require('cors');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

const app = express();

const taskRoutes = require('./routes/task.routes');
const membershipRoutes = require('./routes/member.routes');

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/membership', membershipRoutes)

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // asal frontend
    credentials: true,
  },
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  // join ke room project tertentu
  socket.on('joinProject', (projectId) => {
    socket.join(projectId);
    console.log(`Socket ${socket.id} joined project ${projectId}`);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});


// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
