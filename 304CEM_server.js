var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	
	if(req.url=="/login"){
				
		sendFileContent(res, './login.html', 'text/html');
		
	}else if(req.url=="/logout"){
		
		sendFileContent(res, './logout.html', 'text/html');
	}
	 
  
}).listen(8080);



function sendFileContent(response, fileName, contentType){
fs.readFile(fileName, function(err, data){

	if(err){
	response.writeHead(404);
	response.write("Not Found!");
	}

	else{
	response.writeHead(200, {'Content-Type': contentType});
	response.write(data);

	}

response.end();

});

}