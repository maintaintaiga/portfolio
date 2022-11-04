const getModulePath = require("../util/modulePath");
const logger = require("../util/winston-config");

const logPath = { label: getModulePath(__filename) };

const create = async (req, res, next) => {
  //possible form data: name,email,message
  if (
    // Required
    req.body &&
    Object.keys(req.body).length > 0 &&
    req.body.name &&
    req.body.name.length > 0 &&
    req.body.email &&
    req.body.email.length > 0 &&
    req.body.message &&
    req.body.message.length > 0
  ) {
    try {
      //send email to myself with form data...
      res.status(201).json(res.body);
    } catch (err) {
      logger.error(`Project create failed`, err, logPath);
      return next(extractError(err));
    }
  } else {
    logger.warn(`Bad parameter`, logPath);
    res.status(400 /* Bad Request */).end();
  }
};

module.exports = {
  create,
};
