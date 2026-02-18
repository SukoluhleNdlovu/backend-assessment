const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Issues API",
    version: "1.0.0",
    description: "REST API for managing issues (CRUD).",
  },
  servers: [
  { url: "/", description: "Current host" },
],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], 
};

module.exports = swaggerJSDoc(options);
