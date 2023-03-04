const mailjet = require("node-mailjet");

const config = require("./env-config");
const getModulePath = require("./modulePath");
const logger = require("./winston-config");

const logPath = { label: getModulePath(__filename) };

const sendMail = async (mailTo, mailSubject, mailText, mailHtml) => {
  try {
    if (config.emailEnabled === true) {
      //send mail
      const mailjetClient = mailjet.apiConnect(
        config.emailServiceUser,
        config.emailServicePassword
      );

      if (config.userEmailAddressOverride.length > 0) {
        mailTo = config.userEmailAddressOverride;
      }

      const message = {
        From: {
          Email: config.emailFromAddress,
          Name: `${config.appPrivateTitle} Web Services`,
        },
        To: [
          {
            Email: mailTo,
            //Name: "",
          },
        ],
        Subject: mailSubject,
        TextPart: mailText,
        HTMLPart: mailHtml,
      };

      logger.info(`message: ${JSON.stringify(message)}`, logPath);

      const result = await mailjetClient
        .post("send", { version: "v3.1" })
        .request({ Messages: [message] });

      if (!result || result.err) {
        logger.error(
          `Send mail failed. To: ${mailTo}. Subject: ${mailSubject}`,
          result.err,
          logPath
        );
        return false;
      } else {
        logger.info(
          `Send mail response: ${JSON.stringify(result.body)}`,
          logPath
        );
        return true;
      }
    }
  } catch (err) {
    logger.error(
      `Send mail exception. To: ${mailTo}. Subject: ${mailSubject}`,
      err,
      logPath
    );
    return false;
  }
};

module.exports = { sendMail };
