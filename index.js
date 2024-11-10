const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = 8080;

const server = http.createServer((req, res) => {
  let fileName = req.url === "/" ? "/index.html" : `${req.url}.html`;
  let filePath = path.join(__dirname, "public", fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      let errorPath = path.join(__dirname, "public", "404.html");
      fs.readFile(errorPath, (error, errorPage) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(errorPage);
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
