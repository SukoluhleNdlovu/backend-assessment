const VALID_STATUSES = new Set(["open", "in-progress", "closed"]);

let issues = [];
let nextId = 1;

function create({ title, description, status }) {
  const now = new Date().toISOString();

  const issue = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    status: status ?? "open",
    createdAt: now,
  };

  issues.push(issue);
  return issue;
}

function getAll() {
  return issues;
}

function getById(idParam) {
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    const err = new Error("Invalid id");
    err.statusCode = 400;
    throw err;
  }

  const found = issues.find((i) => i.id === id);
  if (!found) {
    const err = new Error("Issue not found");
    err.statusCode = 404;
    throw err;
  }
  return found;
}

function update(idParam, { title, description, status }) {
  const issue = getById(idParam);

  if (title !== undefined) issue.title = title.trim();
  if (description !== undefined) issue.description = description.trim();
  if (status !== undefined) issue.status = status;

  // optional: if you want, enforce status validity here too:
  if (!VALID_STATUSES.has(issue.status)) {
    const err = new Error("Invalid status");
    err.statusCode = 400;
    throw err;
  }

  return issue;
}

function remove(idParam) {
  const id = Number(idParam);
  const idx = issues.findIndex((i) => i.id === id);
  if (idx === -1) {
    const err = new Error("Issue not found");
    err.statusCode = 404;
    throw err;
  }
  issues.splice(idx, 1);
}

module.exports = { create, getAll, getById, update, remove, VALID_STATUSES };
