const express = require('express');
const healthController = require('../controllers/health');
const eventController = require('../controllers/event');
const userController = require('../controllers/user');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Health endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

// --------- Auth ---------
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       409:
 *         description: Username exists
 */
router.post('/auth/register', userController.register.bind(userController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/auth/login', userController.login.bind(userController));

// --------- Event CRUD ---------
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: List of events
 */
router.get('/events', eventController.list.bind(eventController));

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get details of a specific event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single event details
 *       404:
 *         description: Event not found
 */
router.get('/events/:id', eventController.detail.bind(eventController));

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create an event (auth required)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created
 */
router.post('/events', authenticateToken, eventController.create.bind(eventController));

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event (auth required, owner only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Event not found
 */
router.put('/events/:id', authenticateToken, eventController.update.bind(eventController));

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event (auth required, owner only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Event not found
 */
router.delete('/events/:id', authenticateToken, eventController.delete.bind(eventController));

module.exports = router;
