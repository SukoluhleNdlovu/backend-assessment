/**
 * @swagger
 * components:
 *   schemas:
 *     Issue:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - status
 *         - createdAt
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Login not working
 *         description:
 *           type: string
 *           example: Button does nothing
 *         status:
 *           type: string
 *           enum: [open, in-progress, closed]
 *           example: open
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-02-18T10:00:00.000Z
 *
 *     CreateIssueRequest:
 *       type: object
 *       required: [title, description]
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [open, in-progress, closed]
 *
 *     UpdateIssueRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [open, in-progress, closed]
 */

const express = require("express");
const router = express.Router();

const issuesService = require("../services/issues.service");
const { validateCreateIssue, validateUpdateIssue } = require("../validators/issues.validators");

/**
 * @swagger
 * /issues:
 *   post:
 *     summary: Create an issue
 *     tags: [Issues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIssueRequest'
 *     responses:
 *       201:
 *         description: Created issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: Validation error
 */
router.post("/", validateCreateIssue, (req, res, next) => { ... });

// Create
router.post("/", validateCreateIssue, (req, res, next) => {
  try {
    const created = issuesService.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /issues:
 *   post:
 *     summary: Create an issue
 *     tags: [Issues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIssueRequest'
 *     responses:
 *       201:
 *         description: Created issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: Validation error
 */
router.post("/", validateCreateIssue, (req, res, next) => { ... });

// Get all
router.get("/", (req, res, next) => {
  try {
    const all = issuesService.getAll();
    res.json(all);
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /issues:
 *   post:
 *     summary: Create an issue
 *     tags: [Issues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIssueRequest'
 *     responses:
 *       201:
 *         description: Created issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: Validation error
 */
router.post("/", validateCreateIssue, (req, res, next) => { ... });

// Get one
router.get("/:id", (req, res, next) => {
  try {
    const issue = issuesService.getById(req.params.id);
    res.json(issue);
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /issues:
 *   post:
 *     summary: Create an issue
 *     tags: [Issues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIssueRequest'
 *     responses:
 *       201:
 *         description: Created issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: Validation error
 */
router.post("/", validateCreateIssue, (req, res, next) => { ... });

// Update
router.put("/:id", validateUpdateIssue, (req, res, next) => {
  try {
    const updated = issuesService.update(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /issues:
 *   post:
 *     summary: Create an issue
 *     tags: [Issues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIssueRequest'
 *     responses:
 *       201:
 *         description: Created issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: Validation error
 */
router.post("/", validateCreateIssue, (req, res, next) => { ... });


// Delete
router.delete("/:id", (req, res, next) => {
  try {
    issuesService.remove(req.params.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;