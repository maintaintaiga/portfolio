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
import { config } from "./env-config";
import { format, createLogger, addColors, transports } from "winston";

const { combine, timestamp, align, printf, colorize } = format;

const SymbolType: unique symbol = Symbol();

/* Find an Error object in the logger parameters and
   Add it onto the Info object.
*/

/* If there is an error object, add a stack object onto 
   the Info object but only if not already got one.
 */
const addStack = format((info) => {
  if (!info.stack && info.error && info.error.stack) {
    info.stack = info.error.stack;
  }
  return info;
});

const addLabel = format((info) => {
  if (!info.label) {
    const splat = info[Symbol.for("splat") as any] || [];
    const labelObj = splat.find((obj: any) => obj.label);
    if (labelObj && labelObj.label) {
      info.label = labelObj.label;
    }
  }
  return info;
});

const addLevel = format((info) => {
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
const logger = createLogger({
  level: config.logLevel,
  format: combine(timestamp(), addLevel(), addStack(), addLabel()),
  handleExceptions: true,
  exitOnError: false, // do not exit on handled exceptions
  transports:
    process.env.NODE_ENV !== "test"
      ? [
          new transports.File(options.file),
          new transports.Console(options.console),
        ]
      : [new transports.File(options.file)],
});

// Make debug messages stand out in the console
addColors({ debug: "bold yellow redBG" });

export default logger;
