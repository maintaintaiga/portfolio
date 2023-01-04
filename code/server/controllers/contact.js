const getModulePath = require("../util/modulePath");
const { sendMail } = require("../util/send-mail");
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
      let data = `<div><h2>Name</h2><p>${req.body.name}</p><h2>Email</h2><p>${req.body.email}</p><h2>Message</h2><p>${req.body.message}</p></div>`;
      let result = await sendMail(
        "kate.ramshaw@talktalk.net",
        "Portfolio Message",
        "here",
        data
      );
      if (result) {
        res.status(201).end();
      } else {
        res.status(400 /* Bad Request */).end();
      }
    } catch (err) {
      logger.error(`Email Send Failed`, err, logPath);
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
