const express = require("express");
const router = express.Router();

const issuesService = require("../services/issues.service");
const { validateCreateIssue, validateUpdateIssue } = require("../validators/issues.validators");

// Create
router.post("/", validateCreateIssue, (req, res, next) => {
  try {
    const created = issuesService.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

// Get all
router.get("/", (req, res, next) => {
  try {
    const all = issuesService.getAll();
    res.json(all);
  } catch (e) {
    next(e);
  }
});

// Get one
router.get("/:id", (req, res, next) => {
  try {
    const issue = issuesService.getById(req.params.id);
    res.json(issue);
  } catch (e) {
    next(e);
  }
});

// Update
router.put("/:id", validateUpdateIssue, (req, res, next) => {
  try {
    const updated = issuesService.update(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

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