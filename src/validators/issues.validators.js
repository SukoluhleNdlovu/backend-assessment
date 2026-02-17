const { VALID_STATUSES } = require("../services/issues.service");

function badRequest(res, message) {
  return res.status(400).json({ message });
}

function validateCreateIssue(req, res, next) {
  const { title, description, status } = req.body ?? {};

  if (typeof title !== "string" || title.trim().length < 3) {
    return badRequest(res, "title is required and must be at least 3 characters");
  }
  if (typeof description !== "string" || description.trim().length < 3) {
    return badRequest(res, "description is required and must be at least 3 characters");
  }
  if (status !== undefined && !VALID_STATUSES.has(status)) {
    return badRequest(res, `status must be one of: ${Array.from(VALID_STATUSES).join(", ")}`);
  }

  next();
}

function validateUpdateIssue(req, res, next) {
  const { title, description, status } = req.body ?? {};

  if (title !== undefined && (typeof title !== "string" || title.trim().length < 3)) {
    return badRequest(res, "title must be at least 3 characters");
  }
  if (description !== undefined && (typeof description !== "string" || description.trim().length < 3)) {
    return badRequest(res, "description must be at least 3 characters");
  }
  if (status !== undefined && !VALID_STATUSES.has(status)) {
    return badRequest(res, `status must be one of: ${Array.from(VALID_STATUSES).join(", ")}`);
  }

  next();
}

module.exports = { validateCreateIssue, validateUpdateIssue };
