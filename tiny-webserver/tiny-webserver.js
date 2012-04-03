var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var port = 9337;

var handleHTTPRequest = function(request, response) {
    var _url = url.parse(request.url);
    var resource = path.basename(_url.href);
	
	/* Root index is requested */
	if(resource.length === 0){
		loadIndex(response);
	} else {
		fs.readFile('www/' + resource + '.html', function(error, data) {
			if(error){
				console.log(error);
				switch(error.code){
				/* Root index is requested */
				case 'UNKNOWN': 
					//loadIndex(response);
					break;
				/* Page does not exist */
				case 'ENOENT':
					send404(response);
					break;
				};
			} else {
				response.writeHead(200, {'content-type': 'text/html'});
				response.end(data);
			}
		});
	}
}

var loadIndex = function(response){
	try {
		/* Check if index is available */
		stats = fs.lstatSync('index.html');
		if (stats.isFile()) {
			fs.readFile('index.html', function(error2, data) {
				response.writeHead(200, {'content-type': 'text/html'});
				response.end(data);
			});
		}
	} catch (e) {
		console.log(e);
		sendRandomCode(response);
		//send404(response);
	}
}

var send404 = function(response){
	fs.readFile('www/404.html', function(error2, data) {
		response.writeHead(404, {'content-type': 'text/html'});
		response.end(data);
	});
}

var sendRandomCode = function(response){
	var httpCodes = new Array(400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418);
	var randomCode = Math.floor((Math.random()*httpCodes.length));
	console.log(randomCode);
	fs.readFile('www/404.html', function(error2, data) {
		response.writeHead(httpCodes[randomCode], {'content-type': 'text/html'});
		response.end(data);
	});
}

var server = http.createServer(handleHTTPRequest);
server.listen(port);