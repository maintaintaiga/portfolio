const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const config = require("./util/env-config");
const getModulePath = require("./util/modulePath");
const logger = require("./util/winston-config");
const { getCsurfOptions, createCsurfTokenCookie } = require("./util/csrf");

const logPath = { label: getModulePath(__filename) };

const runApp = () => {
  const app = express();
  const port = config.serverPort;

  /** Useful for debugging */
  /*
  app.use((req, res, next) => {
    logger.info(
      `Method: ${req.method}, Hostname: ${req.hostname}, Original URL: ${req.originalUrl}, Subdomains: ${req.subdomains}`,
      logPath
    );
    return next();
  });
  */

  app.set("trust proxy", true);

  app.use(helmet());

  app.use(
    cors({
      origin: [config.corsOrigin],
      methods: [`HEAD`, `GET`, `POST`, `PUT`, `DELETE`],
      credentials: true,
    })
  );

  if (config.rateLimitEnable) {
    app.use(
      rateLimit({
        windowMs: config.rateLimitWindowMs,
        max: config.rateLimitMaxRequests,
      })
    );
  }

  app.use(cookieParser());

  if (config.csrfEnable) {
    app.use(csurf(getCsurfOptions(config.csrfSecretCookieName)));
    app.use((req, res, next) => {
      createCsurfTokenCookie(req, res, config.csrfTokenCookieName);
      return next();
    });
  }

  app.use(express.json());

  app.use((req, res, next) => {
    logger.info(
      `Method: ${req.method}, Original URL: ${req.originalUrl}`,
      logPath
    );

    return next();
  });

  app.use("/", routes);

  app.use((req, res) => {
    logger.warn(`Invalid route: ${req.originalUrl}`, logPath);
    res.status(404 /* Not Found */).json({ message: "Invalid route" });
  });

  /** Custom Error Handler.
   * Express error handler requires all four arguments
   *  and must follow last app.use.
   * By default Express will return an error message in html format
   *  when next(err) is called.
   *  Sometimes we want to send the text for display in the client.
   *  Set err.sendRawMessage to return the message as is.
   */
  app.use((err, req, res, next) => {
    logger.error(`Api error: ${JSON.stringify(err)}`, logPath);
    if (res.headersSent) {
      return next(err);
    }
    if (err.status != null) {
      res.status(err.status);
    } else {
      res.status(500);
    }
    if (err.sendRawMessage != null && err.sendRawMessage) {
      res.send(err.message);
    } else {
      return next(err);
    }
  });

  app.listen(port, () => {
    logger.info(
      `${config.appPrivateTitle} API listening on port ${port}`,
      logPath
    );
  });
};

try {
  runApp();
} catch (err) {
  logger.error(`Application initialisation failed`, err, logPath);
}
