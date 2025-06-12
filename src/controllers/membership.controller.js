const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addMember = async (req, res) => {
  const { projectId, userId } = req.body;
  const ownerId = req.user.id;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.ownerId !== ownerId)
    return res.status(403).json({ message: 'Only project owner can add members' });

  try {
    const member = await prisma.membership.create({
      data: { projectId, userId },
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProjectMembers = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  const project = await prisma.project.findUnique({ where: { id: projectId } });

  const isOwner = project?.ownerId === userId;
  const isMember = await prisma.membership.findFirst({
    where: { projectId, userId },
  });

  if (!isOwner && !isMember)
    return res.status(403).json({ message: 'Access denied' });

  const members = await prisma.membership.findMany({
    where: { projectId },
    include: { user: true },
  });

  res.json(members);
};
