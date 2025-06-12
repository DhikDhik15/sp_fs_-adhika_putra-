const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTask = async (req, res) => {
  const { title, description, status, projectId, assigneeId } = req.body;
  const ownerId = req.user.id;

  const project = await prisma.project.findFirst({ where: { id: projectId, ownerId } });
  if (!project) return res.status(403).json({ message: 'Not your project' });

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      projectId,
      assigneeId,
    },
  });

  res.status(201).json(task);
};

exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  const ownerId = req.user.id;

  const project = await prisma.project.findFirst({ where: { id: projectId, ownerId } });
  if (!project) return res.status(403).json({ message: 'Not your project' });

  const tasks = await prisma.task.findMany({
    where: { projectId },
  });

  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: 'Task not found' });

  const updated = await prisma.task.update({
    where: { id },
    data: req.body,
  });

  // Emit ke project room
  const io = req.app.get('io');
  io.to(existing.projectId).emit('taskUpdated', updated);

  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const project = await prisma.project.findFirst({ where: { id: task.projectId, ownerId } });
  if (!project) return res.status(403).json({ message: 'Not your project' });

  await prisma.task.delete({ where: { id } });
  res.json({ message: 'Task deleted' });
};
