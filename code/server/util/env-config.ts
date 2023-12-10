const replaceTitle = (text: string): string => {
  const regExp = new RegExp(
    `${process.env.APP_PRIVATE_TITLE_PLACEHOLDER}`,
    "g"
  );
  const regExpLc = new RegExp(
    `${process.env.APP_PRIVATE_TITLE_LC_PLACEHOLDER}`,
    "g"
  );
  const firstReplace = text.replace(
    regExp,
    process.env.APP_PRIVATE_TITLE ?? ""
  );
  return firstReplace.replace(regExpLc, process.env.APP_PRIVATE_TITLE_LC ?? "");
};

export const config = {
  appPrivateTitlePlaceHolder: process.env
    .APP_PRIVATE_TITLE_PLACEHOLDER as string,
  appPrivateTitleLcPlaceHolder: process.env
    .APP_PRIVATE_TITLE_LC_PLACEHOLDER as string,
  appPrivateTitle: process.env.APP_PRIVATE_TITLE as string,
  appPrivateTitleLc: process.env.APP_PRIVATE_TITLE_LC as string,
  nodeEnv: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
  port: process.env.SERVER_PORT,
  corsOrigin: replaceTitle(process.env.CORS_ORIGIN ?? ""),
  clientDomain: replaceTitle(process.env.CLIENT_DOMAIN ?? ""),
  csrfEnable: process.env.CSRF_ENABLE === "true",
  csrfSecretCookieName: replaceTitle(process.env.CSRF_SECRET_COOKIE_NAME ?? ""),
  csrfTokenCookieName: replaceTitle(process.env.CSRF_TOKEN_COOKIE_NAME ?? ""),
  rateLimitEnable: process.env.RATE_LIMIT_ENABLE === "true",
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? ""),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS ?? ""),
  userEmailAddressOverride: process.env.USER_EMAIL_ADDRESS_OVERRIDE,
  emailEnabled: process.env.EMAIL_ENABLED === "true",
  emailServiceUser: process.env.EMAIL_SERVICE_USER,
  emailServicePassword: process.env.EMAIL_SERVICE_PASSWORD,
  emailFromAddress: process.env.EMAIL_FROM_ADDRESS as string,
  emailToAddress: process.env.EMAIL_TO_ADDRESS as string,
  emailPort: process.env.EMAIL_PORT,
  logFilePath: replaceTitle(process.env.LOG_FILE_PATH ?? ""),
};
