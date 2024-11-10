const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 8080;

const server = http.createServer((req, res) => {
    let pagePath;
    let statsCode = 200;
    if (req.url === "/") {
        pagePath = path.join(__dirname, 'public', 'index.html');
    } else if (req.url === "/about") {
        pagePath = path.join(__dirname, 'public', 'about.html');
    } else if (req.url === "/contact-me") {
        pagePath = path.join(__dirname, 'public', 'contact-me.html');
    } else {
        pagePath = path.join(__dirname, 'public', '404.html');
        statsCode = 404;
    }

    fs.readFile(pagePath, (err, data) => {
        if (err) throw err;
        res.writeHead(statsCode, {'Content-Type' : 'text/html'});
        res.end(data)
    })
})

server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
})

