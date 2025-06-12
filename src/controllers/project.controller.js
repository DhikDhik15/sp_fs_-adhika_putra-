const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProject = async (req, res) => {
  const { name } = req.body;
  const ownerId = req.user.id;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        ownerId,
      },
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyProjects = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const projects = await prisma.project.findMany({
      where: { ownerId },
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;

  const project = await prisma.project.findFirst({
    where: { id, ownerId },
  });

  if (!project) return res.status(404).json({ message: 'Project not found' });

  res.json(project);
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const ownerId = req.user.id;

  const project = await prisma.project.findFirst({ where: { id, ownerId } });
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const updated = await prisma.project.update({
    where: { id },
    data: { name },
  });

  res.json(updated);
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user.id;

  const project = await prisma.project.findFirst({ where: { id, ownerId } });
  if (!project) return res.status(404).json({ message: 'Project not found' });

  await prisma.project.delete({ where: { id } });

  res.json({ message: 'Project deleted' });
};
