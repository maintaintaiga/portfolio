const config = require("../util/env-config");
const getModulePath = require("../util/modulePath");
const logger = require("../util/winston-config");

const logPath = { label: getModulePath(__filename) };

const get = async (req, res, next) => {
  try {
    console.log("here it is");
    res.status(200).download("./cvItGeneral.pdf");
  } catch (err) {
    logger.error(`Database report controller failed`, err, logPath);
    return next(extractError(err));
  }
};

module.exports = {
  get,
};
