function errorMessage (response){
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
        "Content-type": "application/json"
    };
    response.writeHead(400, headers);
    response.write(JSON.stringify({
        "status": "false",
        "message": "欄位未正確填寫或無此代辦事項"
    }));
response.end();
}

module.exports = errorMessage;