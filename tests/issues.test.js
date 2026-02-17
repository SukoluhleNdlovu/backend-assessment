const request = require("supertest");
const app = require("../src/app");

describe("Issues API", () => {
  it("GET /health should return ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it("GET /issues should start empty array", async () => {
    const res = await request(app).get("/issues");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /issues should create an issue", async () => {
    const payload = {
      title: "Login not working",
      description: "Button does nothing",
      status: "open",
    };

    const res = await request(app).post("/issues").send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(payload.title);
    expect(res.body.description).toBe(payload.description);
    expect(res.body.status).toBe(payload.status);
    expect(res.body).toHaveProperty("createdAt");
  });

  it("GET /issues/:id should return the created issue", async () => {
    const createRes = await request(app).post("/issues").send({
      title: "Profile image not loading",
      description: "Image is blank",
      status: "in-progress",
    });

    const id = createRes.body.id;

    const res = await request(app).get(`/issues/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.title).toBe("Profile image not loading");
  });

  it("PUT /issues/:id should update an issue", async () => {
    const createRes = await request(app).post("/issues").send({
      title: "Crash on launch",
      description: "App crashes after splash",
      status: "open",
    });

    const id = createRes.body.id;

    const updateRes = await request(app).put(`/issues/${id}`).send({
      status: "closed",
    });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.id).toBe(id);
    expect(updateRes.body.status).toBe("closed");
  });

  it("DELETE /issues/:id should delete an issue", async () => {
    const createRes = await request(app).post("/issues").send({
      title: "Settings overflow",
      description: "Text overlaps",
      status: "open",
    });

    const id = createRes.body.id;

    const delRes = await request(app).delete(`/issues/${id}`);
    expect(delRes.statusCode).toBe(204);

    const getRes = await request(app).get(`/issues/${id}`);
    expect(getRes.statusCode).toBe(404);
  });

  it("POST /issues should fail validation when title is missing", async () => {
    const res = await request(app).post("/issues").send({
      description: "No title here",
      status: "open",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("POST /issues should fail when status is invalid", async () => {
    const res = await request(app).post("/issues").send({
      title: "Invalid status",
      description: "Status wrong",
      status: "done",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
