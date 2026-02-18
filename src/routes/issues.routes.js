const express = require("express");
const router = express.Router();

const issuesService = require("../services/issues.service");
const {
  validateCreateIssue,
  validateUpdateIssue,
} = require("../validators/issues.validators");

/**
 * @swagger
 * tags:
 *   name: Issues
 *   description: Issue management endpoints
 *
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
 *           example: Login not working
 *         description:
 *           type: string
 *           example: Button does nothing
 *         status:
 *           type: string
 *           enum: [open, in-progress, closed]
 *           example: open
 *
 *     UpdateIssueRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Updated title
 *         description:
 *           type: string
 *           example: Updated description
 *         status:
 *           type: string
 *           enum: [open, in-progress, closed]
 *           example: closed
 */

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
 *   get:
 *     summary: Get all issues
 *     tags: [Issues]
 *     responses:
 *       200:
 *         description: List of issues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Issue'
 */
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
 * /issues/{id}:
 *   get:
 *     summary: Get a single issue by id
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Issue found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Issue not found
 */
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
 * /issues/{id}:
 *   put:
 *     summary: Update an issue by id
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateIssueRequest'
 *     responses:
 *       200:
 *         description: Updated issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: Validation error or invalid id
 *       404:
 *         description: Issue not found
 */
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
 * /issues/{id}:
 *   delete:
 *     summary: Delete an issue by id
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Issue not found
 */
router.delete("/:id", (req, res, next) => {
  try {
    issuesService.remove(req.params.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
