var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Congratulations, it works!\n');
}).listen(9991, '127.0.0.1');
console.log('Server running at http://127.0.0.1:9991/');