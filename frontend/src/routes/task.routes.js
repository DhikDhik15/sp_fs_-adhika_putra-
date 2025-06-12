const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

router.use(auth);
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task tracking
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *               projectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */

/**
 * @swagger
 * /tasks/{projectId}:
 *   get:
 *     summary: Get tasks by project
 *     tags: [Tasks]
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks
 */

router.post('/', createTask);
router.get('/:projectId', getTasksByProject);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
