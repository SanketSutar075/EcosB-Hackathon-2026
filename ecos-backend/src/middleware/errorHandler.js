// FILE: src/middleware/errorHandler.js

export function errorHandler(err, req, res, next) {
  const status  = err.status  || 500;
  const message = err.message || "Internal Server Error";

  console.error(
    `\x1b[31m[ERROR]\x1b[0m ${req.method} ${req.path} → ${status}: ${message}`
  );

  if (process.env.NODE_ENV === "development" && err.stack) {
    console.error(err.stack);
  }

  res.status(status).json({
    success: false,
    error:   message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}