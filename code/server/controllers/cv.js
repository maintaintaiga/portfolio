const { data } = require("../util/cvInfo");
const extractError = require("../util/extract-error");
const getModulePath = require("../util/modulePath");
const logger = require("../util/winston-config");

const logPath = { label: getModulePath(__filename) };

const get = async (req, res, next) => {
  try {
    res.status(200).json(data);
  } catch (err) {
    logger.error(`Database report controller failed`, err, logPath);
    return next(extractError(err));
  }
};

const getItem = async (req, res, next) => {
  if (req.params && req.params.name && typeof req.params.name === "string") {
    try {
      let returnData = data[req.params.name];
      res.status(200).json(returnData);
    } catch (err) {
      logger.error(`Database report controller failed`, err, logPath);
      return next(extractError(err));
    }
  } else {
    logger.warn(`Bad parameter`, { meta: req.params }, logPath);
    res.status(400 /* Bad Request */).end();
  }
};

module.exports = {
  get,
  getItem,
};
