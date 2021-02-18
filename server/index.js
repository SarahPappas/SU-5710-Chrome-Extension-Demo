const http = require('http');

const server = http.createServer((request, response) => {
    if (request.method == 'POST') {
        let msg = "";
        request.on('data', (data) => {
            msg += data;

            msg = JSON.parse(msg);
            console.log(msg.msg + '\n');
        });
        
        request.on('end', () => {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('post received');
        });
    }
});

const port = 3000;
const host = '127.0.0.1'
server.listen(port, host);
console.log(`listening at http://localhost:${port}`);