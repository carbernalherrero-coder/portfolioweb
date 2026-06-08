const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "127.0.0.1";
const port = 5179;
const root = __dirname;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function resolveRequestPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = path.join(root, safePath);

  if (!requestedPath.startsWith(root)) {
    return path.join(root, "index.html");
  }

  return requestedPath;
}

function serveFile(response, filePath) {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      serveFile(response, path.join(root, "index.html"));
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extension] || "application/octet-stream";

    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    });

    fs.createReadStream(filePath).pipe(response);
  });
}

const server = http.createServer((request, response) => {
  const requestedPath = resolveRequestPath(request.url || "/");
  const filePath = requestedPath.endsWith(path.sep)
    ? path.join(requestedPath, "index.html")
    : requestedPath;

  serveFile(response, filePath);
});

server.listen(port, host, () => {
  console.log(`Preview local disponible en http://${host}:${port}/`);
});

