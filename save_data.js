const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      fs.writeFile('data.json', body, (err) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Error writing to file');
        } else {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Data received and saved to data.json');
        }
      });
    });
  } else {
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Only POST method is supported');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
