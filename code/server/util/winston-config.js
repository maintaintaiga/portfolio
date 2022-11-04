/* 
  Customised Logging:
    Had great difficulty using some of the supplied logging formats.
    Decided to create my own.
      addError, addStack, addLabel, addMeta.
    
    Usage:
      logger.info("message", error, label, meta)
      Where:
        error is an Error object.
        label is an object of the form {label: "label text"}.
        meta is an object of the form {meta: <object>}.
      The error, label and meta objects can be in any order.
      Only the first of each object will be processed.
    
  Default Log Levels:
    {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      verbose: 4,
      debug: 5,
      silly: 6
    }
    
    The development level should be set to: silly.
      All level messages will be reported.
    The production level should be set to: warn.
      Error and warn level messages will be reported.
 */
const config = require("./env-config");

//const { createLogger, format, transports } = require("winston");
const w = require("winston");

const { combine, timestamp, align, printf, colorize } = w.format;

/* Find an Error object in the logger parameters and
   Add it onto the Info object.
*/
const addError = w.format((info) => {
  if (!info.error) {
    const splat = info[Symbol.for("splat")] || [];
    info.error = splat.find((obj) => obj instanceof Error);

    /* Winston concatenates the error message onto the main message.
     Chop the error message off the main message.
  */
    if (info.error && info.error.message && info.message) {
      if (info.message.endsWith(info.error.message))
        info.message = info.message.substr(
          0,
          info.message.length - info.error.message.length
        );
    }
  }
  return info;
});

/* If there is an error object, add a stack object onto 
   the Info object but only if not already got one.
 */
const addStack = w.format((info) => {
  if (!info.stack && info.error && info.error.stack) {
    info.stack = info.error.stack;
  }
  return info;
});

const addLabel = w.format((info) => {
  if (!info.label) {
    const splat = info[Symbol.for("splat")] || [];
    const labelObj = splat.find((obj) => obj.label);
    if (labelObj && labelObj.label) {
      info.label = labelObj.label;
    }
  }
  return info;
});

const addMeta = w.format((info) => {
  if (!info.meta) {
    const splat = info[Symbol.for("splat")] || [];
    const metaObj = splat.find((obj) => obj.meta);
    if (metaObj) {
      info.metaString = JSON.stringify(metaObj.meta);
    }
  } else {
    info.metaString = JSON.stringify(info.meta);
  }
  return info;
});

const addLevel = w.format((info) => {
  if (info.level) {
    info.level = info.level.toUpperCase();
  }
  return info;
});

const logFormat = printf((info) => {
  let log = `${info.timestamp} : ${info.level} : ${info.label} : ${info.message}`;
  if (info.metaString) {
    log += ` : ${info.metaString}`;
  }
  if (info.error && info.error.message) {
    log += ` : ${info.error.message}`;
  }
  if (info.stack) {
    log += `\n${info.stack}`;
  }
  return log;
});

let options = {
  file: {
    filename: `${config.logFilePath}/app.log`,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: combine(align(), logFormat),
  },
  console: {
    format: combine(colorize({ all: true }), logFormat),
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = w.createLogger({
  level: config.logLevel,
  format: combine(
    timestamp(),
    addLevel(),
    addError(),
    addStack(),
    addLabel(),
    addMeta()
  ),
  handleExceptions: true,
  exitOnError: false, // do not exit on handled exceptions
  transports:
    process.env.NODE_ENV !== "test"
      ? [
          new w.transports.File(options.file),
          new w.transports.Console(options.console),
        ]
      : [new w.transports.File(options.file)],
});

// Make debug messages stand out in the console
w.addColors({ debug: "bold yellow redBG" });

module.exports = logger;
