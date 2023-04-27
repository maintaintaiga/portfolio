import { RequestHandler } from "express";
import { data } from "../util/cvInfo";
import extractError from "../util/extract-error";
import getModulePath from "../util/modulePath";
import logger from "../util/winston-config";

const logPath = { label: getModulePath(__filename) };

const get: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json(data);
  } catch (err) {
    logger.error(`Database report controller failed`, err, logPath);
    return next(extractError(err));
  }
};

const getItem: RequestHandler = async (req, res, next) => {
  if (req.params && req.params.name && typeof req.params.name === "string") {
    try {
      if (data && data.hasOwnProperty(req.params.name)) {
        let returnData = data[req.params.name as keyof typeof data];
        res.status(200).json(returnData);
      } else {
        logger.warn(`Bad parameter`, { meta: req.params }, logPath);
        res.status(400 /* Bad Request */).end();
      }
    } catch (err) {
      logger.error(`Database report controller failed`, err, logPath);
      return next(extractError(err));
    }
  } else {
    logger.warn(`Bad parameter`, { meta: req.params }, logPath);
    res.status(400 /* Bad Request */).end();
  }
};

export { get, getItem };
