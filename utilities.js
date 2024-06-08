const fs = require("fs");
const path = require("path");

const DEFAULT_PORT = 3838;
const MAX_PORT = DEFAULT_PORT + 1000;

/**
 * Recursively retrieves all Markdown files from a given directory.
 *
 * @param {string} dir - The directory path to search for Markdown files.
 * @returns {string[]} An array of file paths for all Markdown files found in the directory and its subdirectories.
 */
function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (path.extname(file) === ".md") {
      results.push(filePath);
    }
  });

  return results;
}

/**
 * Finds an available port within the specified range for the given Express application.
 *
 * @param {express.Application} app - The Express application instance.
 * @param {number} startPort - The starting port number to check.
 * @param {number} maxPort - The maximum port number to check.
 * @returns {Promise<number>} A promise that resolves to an available port number.
 * @throws Will throw an error if no available ports are found within the specified range.
 */
async function findAvailablePort(app, startPort, maxPort) {
  let port = startPort;
  while (port <= maxPort) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
          server.close(() => resolve(port));
        });
        server.on("error", reject);
      });
      return port;
    } catch (err) {
      port++;
    }
  }
  throw new Error(`No available ports between ${startPort} and ${maxPort}`);
}

/**
 * Starts the Express server on an available port within a specified range.
 *
 * @param {express.Application} app - The Express application instance.
 * @returns {Promise<void>} A promise that resolves when the server starts successfully.
 * @throws Will throw an error if no available port is found within the specified range.
 */
async function startServer(app) {
  try {
    const port = await findAvailablePort(app, DEFAULT_PORT, MAX_PORT);
    app.listen(port, () => {
      console.log(`Markdown server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Encodes a file path to a Base64 string.
 *
 * @param {string} filePath - The file path to be encoded.
 * @returns {string} The Base64 encoded string of the file path.
 */
function encodeBase64(filePath) {
  return Buffer.from(filePath).toString("base64");
}

/**
 * Decodes a Base64 encoded string to a file path.
 *
 * @param {string} encodedPath - The Base64 encoded string to be decoded.
 * @returns {string} The decoded file path.
 */
function decodeBase64(encodedPath) {
  return Buffer.from(encodedPath, "base64").toString("utf-8");
}

module.exports = {
  getFilesRecursively,
  startServer,
  encodeBase64,
  decodeBase64,
};
