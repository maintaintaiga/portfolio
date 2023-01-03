const replaceTitle = (text) => {
  const regExp = new RegExp(
    `${process.env.APP_PRIVATE_TITLE_PLACEHOLDER}`,
    "g"
  );
  const regExpLc = new RegExp(
    `${process.env.APP_PRIVATE_TITLE_LC_PLACEHOLDER}`,
    "g"
  );
  const firstReplace = text.replace(regExp, process.env.APP_PRIVATE_TITLE);
  return firstReplace.replace(regExpLc, process.env.APP_PRIVATE_TITLE_LC);
};

module.exports = {
  appPrivateTitlePlaceHolder: process.env.APP_PRIVATE_TITLE_PLACEHOLDER,
  appPrivateTitleLcPlaceHolder: process.env.APP_PRIVATE_TITLE_LC_PLACEHOLDER,
  appPrivateTitle: process.env.APP_PRIVATE_TITLE,
  appPrivateTitleLc: process.env.APP_PRIVATE_TITLE_LC,
  nodeEnv: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
  serverPort: process.env.SERVER_PORT,
  rateLimitEnable: process.env.RATE_LIMIT_ENABLE === "true",
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS,
  rateLimitMaxRequests: process.env.RATE_LIMIT_MAX_REQUESTS,
  userEmailAddressOverride: process.env.USER_EMAIL_ADDRESS_OVERRIDE,
  emailEnabled: process.env.EMAIL_ENABLED,
  emailServiceUser: process.env.EMAIL_SERVICE_USER,
  emailServicePassword: process.env.EMAIL_SERVICE_PASSWORD,
  emailFromAddress: replaceTitle(process.env.EMAIL_FROM_ADDRESS),
  emailPort: process.env.EMAIL_PORT,
  logFilePath: replaceTitle(process.env.LOG_FILE_PATH),
};
