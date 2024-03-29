import { CookieOptions } from "csurf";
import { Request, Response } from "express";
import { config } from "./env-config";

type CsurfProps = {
  cookie: CookieOptions;
};

const getCsurfOptions = (secretCookieName: string): CsurfProps => {
  return {
    cookie:
      config.nodeEnv !== "production"
        ? {
            key: secretCookieName,
            domain: config.clientDomain,
            sameSite: "none",
            httpOnly: true, // to disable accessing cookie via client side js
            secure: true, // to force https (if you use it)
            //maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
          }
        : {
            key: secretCookieName,
            domain: config.clientDomain,
            sameSite: "strict",
            httpOnly: true, // to disable accessing cookie via client side js
            secure: true, // to force https (if you use it)
            //maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
          },
  };
};

/** The client needs to be able to read the token from the cookie.
 *    So httpOnly: false.
 */
const createCsurfTokenCookie = (
  req: Request,
  res: Response,
  tokenCookieName: string
) => {
  res.cookie(
    tokenCookieName,
    req.csrfToken(),
    config.nodeEnv !== "production"
      ? {
          domain: config.clientDomain,
          sameSite: "none",
          httpOnly: false, // to disable accessing cookie via client side js
          secure: true, // to force https (if you use it)
          //maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
        }
      : {
          domain: config.clientDomain,
          sameSite: "strict",
          httpOnly: false, // to disable accessing cookie via client side js
          secure: true, // to force https (if you use it)
          //maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
        }
  );
};

export { getCsurfOptions, createCsurfTokenCookie };
