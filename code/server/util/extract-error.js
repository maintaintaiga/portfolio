const config = require(`../util/env-config`);

const extractError = (error) => {
  const extract =
    config.nodeEnv !== "production"
      ? `Error message: ${error.message}`
      : `An error has occurred`;
  return extract;
};

module.exports = extractError;
