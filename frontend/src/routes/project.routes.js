const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects for current user
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project detail
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project data
 */

router.use(auth); // semua route ini butuh login

router.post('/', createProject);
router.get('/', getMyProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
