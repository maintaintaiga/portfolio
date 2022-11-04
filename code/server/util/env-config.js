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
  apiServerPort: process.env.API_SERVER_PORT,
  corsOrigin: replaceTitle(process.env.CORS_ORIGIN),
  rateLimitEnable: process.env.RATE_LIMIT_ENABLE === "true",
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS,
  rateLimitMaxRequests: process.env.RATE_LIMIT_MAX_REQUESTS,
  csrfEnable: process.env.CSRF_ENABLE === "true",
  csrfApiSecretCookieName: replaceTitle(
    process.env.CSRF_API_SECRET_COOKIE_NAME
  ),
  csrfApiTokenCookieName: replaceTitle(process.env.CSRF_API_TOKEN_COOKIE_NAME),
  cookieExpiresDays: process.env.COOKIE_EXPIRES_DAYS,
  clientDomain: replaceTitle(process.env.CLIENT_DOMAIN),
  userEmailAddressOverride: process.env.USER_EMAIL_ADDRESS_OVERRIDE,
  emailSelectedService: process.env.EMAIL_SELECTED_SERVICE,
  emailServices: process.env.EMAIL_SERVICES,
  emailHosts: process.env.EMAIL_HOSTS,
  emailServiceUsers: process.env.EMAIL_SERVICE_USERS,
  emailServicePasswords: process.env.EMAIL_SERVICE_PASSWORDS,
  emailFromAddresses: replaceTitle(process.env.EMAIL_FROM_ADDRESSES),
  emailPort: process.env.EMAIL_PORT,
  emailSecure: process.env.EMAIL_SECURE === "true",
  emailFilePath: replaceTitle(process.env.EMAIL_FILE_PATH),
  logFilePath: replaceTitle(process.env.LOG_FILE_PATH),
};
