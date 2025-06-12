// src/middlewares/projectAccess.middleware.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function isMemberOrOwner(req, res, next) {
  const userId = req.user.id;
  const projectId = req.params.projectId || req.body.projectId;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const isOwner = project.ownerId === userId;
  const isMember = await prisma.membership.findFirst({
    where: { userId, projectId },
  });

  if (!isOwner && !isMember)
    return res.status(403).json({ message: 'Access denied' });

  next();
}

module.exports = isMemberOrOwner;
