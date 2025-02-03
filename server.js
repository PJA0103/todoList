const http = require("http");

const requestListener = (request, response) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
        "Content-type": "application/json"
    }
    console.log(request.url);
    if (request.url =="/" && request.method =="GET"){
        response.writeHead(200,headers); 
        response.write(JSON.stringify({
            "status": "success",
            "data": [],
        }));
        response.end();
    }else{
        response.writeHead(404,headers);
        response.write(JSON.stringify({
            "status": "false",
            "message": "沒有這個路徑",
        }));
        response.end();
    }
}

const server = http.createServer(requestListener);
server.listen(3005);