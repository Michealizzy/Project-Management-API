import http from "node:http";
import url from "node:url";

const port = "3000";
const hostname = "127.0.0.1";

const server = http.createServer((req, res) => {
    res.statusCode = 201;
    res.setHeader = ("Content-Type", "text/plain");
    res.end("testing my api live\n")
})

server.listen(port, () => {
    console.log(`server is running at http//:${hostname}: ${port}/`)
})