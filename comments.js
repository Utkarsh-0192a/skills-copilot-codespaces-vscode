//create a web seerver
//importing the http module
const http = require('http');

//importing the fs module
const fs = require('fs');

//importing the url module
const url = require('url');

//importing the querystring module
const querystring = require('querystring');

//creating a server
const server = http.createServer((req, res) => {
    //parsing the url
    const parsedUrl = url.parse(req.url);

    //parsing the query string
    const parsedQuery = querystring.parse(parsedUrl.query);

    //checking if the request is a POST request
    if (req.method === 'POST') {
        let body = '';

        //reading the data from the request
        req.on('data', chunk => {
            body += chunk.toString();
        });

        //sending a response to the request
        req.on('end', () => {
            res.end('Success');
        });
    } else {
        //reading the file
        fs.readFile('./index.html', (err, data) => {
            //sending the file as a response
            res.end(data);
        });
    }
});

//listening to the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});