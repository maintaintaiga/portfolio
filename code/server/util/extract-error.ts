import { config } from "../util/env-config";

type ErrorProps = {
  message: string;
};

const extractError = (error: any) => {
  const extract =
    config.nodeEnv !== "production" && error instanceof Error
      ? `Error message: ${error.message}`
      : `An error has occurred`;
  return extract;
};

export default extractError;
