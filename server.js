const http = require("http");
// const { resolve } = require("path");
const { v4: uuidv4 } = require("uuid");
const errMessage = require('./errorMessage');
const todos = [];
const requestListener = (request, response) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
        "Content-type": "application/json"
    }
    let body ="";
    request.on("data", chunk =>{
        body+= chunk;
    })
    if (request.url =="/todos" && request.method =="GET"){
        response.writeHead(200, headers); 
        response.write(JSON.stringify({
            "status": "success",
            "data": todos,
        }));
        response.end();
    }else if (request.url =="/todos" && request.method =="POST"){
        request.on("end", () =>{
            try{
                const title = JSON.parse(body).title;
                if (title !== undefined){
                    const todo = {
                        "title": title,
                        "id": uuidv4()
                    }
                    todos.push(todo);
                    response.writeHead(200, headers);
                    response.write(JSON.stringify({
                        "status": "success",
                        "data": todos,
                    }));
                    response.end();
                }else{
                    errMessage(response);
                }
            }catch(error){ 
                errMessage(response);
            }
        })
    }else if (request.method =="OPTIONS"){
        response.writeHead(200, headers);
        response.end();
    }else{
        response.writeHead(404, headers);
        response.write(JSON.stringify({
            "status": "false",
            "message": "沒有這個路徑",
        }));
        response.end();
    }
}

const server = http.createServer(requestListener);
server.listen(3005);

