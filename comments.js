// create a web server
// create a route that listens for POST requests to /comments
// when a POST request is received, parse the incoming form data
// and save it to a file called comments.json
// load the existing comments from comments.json and display them
// create a form that allows users to submit new comments
// load the existing comments from comments.json and display them

const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const { parse } = require('url');

const server = http.createServer((req, res) => {
  const { method } = req;
  const { pathname } = parse(req.url);

  if (method === 'GET' && pathname === '/comments') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body>');
    res.write('<h1>Comments</h1>');
    res.write('<ul>');

    fs.readFile('comments.json', 'utf8', (err, data) => {
      if (err) {
        res.write('<li>No comments yet</li>');
        res.write('</ul>');
        res.write('<form method="POST" action="/comments">');
        res.write('<textarea name="comment"></textarea><br>');
        res.write('<button type="submit">Submit</button>');
        res.write('</form>');
        res.write('</body></html>');
        res.end();
        return;
      }

      const comments = JSON.parse(data);
      comments.forEach((comment) => {
        res.write(`<li>${comment}</li>`);
      });

      res.write('</ul>');
      res.write('<form method="POST" action="/comments">');
      res.write('<textarea name="comment"></textarea><br>');
      res.write('<button type="submit">Submit</button>');
      res.write('</form>');
      res.write('</body></html>');
      res.end();
    });
  }

  if (method === 'POST' && pathname === '/comments') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const comment = qs.parse(Buffer.concat(body).toString()).comment;

      fs.readFile('comments.json', 'utf8', (err, data) => {
        const comments = err ? [] : JSON.parse(data);
        comments.push(comment);

        fs.writeFile('comments.json', JSON