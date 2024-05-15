const jwt = require("jsonwebtoken");

/**
 * @description Middleware para autenticar tokens JWT
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para llamar al siguiente middleware
 * @returns {Function} - Llama al siguiente middleware o envía un estado de error HTTP
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    "4f6a6d8be9b92fc2ebe24d7f65c8a798b1d822b2eafce929c4df22a68fb1cde7210cf679b394dd7e210113734eab44d567387f8bfa4a80d4341082bfbdfe0841",
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
}

module.exports = authenticateToken;
