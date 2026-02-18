const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const issuesRoutes = require("./routes/issues.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/issues", issuesRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
  });
});

module.exports = app;

// Only start listening if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}