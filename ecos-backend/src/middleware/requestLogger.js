// FILE: src/middleware/requestLogger.js

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const ms     = Date.now() - start;
    const status = res.statusCode;
    const color  =
      status >= 500 ? "\x1b[31m" :   // red
      status >= 400 ? "\x1b[33m" :   // yellow
      status >= 200 ? "\x1b[32m" :   // green
                      "\x1b[0m";

    console.log(
      `${color}[${status}]\x1b[0m ${req.method} ${req.path} — ${ms}ms`
    );
  });

  next();
}