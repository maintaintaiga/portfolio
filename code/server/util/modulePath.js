const path = require("path");

const getModulePath = (fullPath) => {
  const pathParts = fullPath.split(path.sep);
  let partCount = pathParts.length;
  let startIndex = 0;
  let trailingPath = "";
  let index = 0;

  for (index = 0; index < partCount; index++) {
    if (pathParts[index] === "src") {
      startIndex = index;
      break;
    }
  }

  if (startIndex === 0) {
    startIndex = partCount > 3 ? partCount - 3 : 0;
  }

  for (index = startIndex; index < partCount; index++) {
    if (index > startIndex) {
      trailingPath += path.sep;
    }
    trailingPath += pathParts[index];
  }
  return trailingPath;
};
module.exports = getModulePath;
