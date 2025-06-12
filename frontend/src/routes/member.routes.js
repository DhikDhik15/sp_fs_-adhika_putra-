const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  addMember,
  getProjectMembers
} = require('../controllers/membership.controller');

router.use(auth);
/**
 * @swagger
 * tags:
 *   name: Membership
 *   description: Project membership management
 */

/**
 * @swagger
 * /membership:
 *   post:
 *     summary: Add member to project
 *     tags: [Membership]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member added
 */

/**
 * @swagger
 * /membership/{projectId}:
 *   get:
 *     summary: Get project members
 *     tags: [Membership]
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member list
 */

router.post('/', addMember); // Add member ke project
router.get('/:projectId', getProjectMembers); // Lihat semua anggota project

module.exports = router;
