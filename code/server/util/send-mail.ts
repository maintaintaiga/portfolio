import mailjet from "node-mailjet";

import { config } from "./env-config";
import getModulePath from "./modulePath";
import logger from "./winston-config";

const logPath = { label: getModulePath(__filename) };

const sendMail = async (
  mailTo: string,
  mailSubject: string,
  mailText: string,
  mailHtml: string
): Promise<boolean> => {
  try {
    if (
      config.emailEnabled === true &&
      config.emailServiceUser &&
      config.emailServicePassword
    ) {
      //send mail
      const mailjetClient = mailjet.apiConnect(
        config.emailServiceUser,
        config.emailServicePassword
      );

      if (
        config.userEmailAddressOverride &&
        config.userEmailAddressOverride.length > 0
      ) {
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

      if (!result || result?.response?.status !== 200) {
        logger.error(
          `Send mail failed. To: ${mailTo}. Subject: ${mailSubject}`,
          result.response.statusText,
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
    } else {
      return false;
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

export { sendMail };
