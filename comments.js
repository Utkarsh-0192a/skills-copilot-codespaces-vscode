// Create web server
// Create a web server that listens on port 3000 and serves the comments.json file. 
// Use the fs.readFile function to read the contents of the file and send it back as the response. 
// Remember to set the Content-Type header to application/json.

// Use the fs.readFile function to read the contents of the file and send it back as the response. 
// Remember to set the Content-Type header to application/json.
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('An error occurred');
        } else {
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});