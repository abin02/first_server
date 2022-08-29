const http = require("http");

const port = 8081;

const toDoList = ["Complete Node Byte", "Play Cricket"];
let con = 0;
http
    .createServer((req, res) => {
        const { method, url } = req;
        if (url === "/todos") {
            if (method === "GET") {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(toDoList.toString());
            } else if (method === "POST") {
                let body = "";
                req.on('error', (err) => {
                    console.error(err);
                }).on('data', (chunk) => {
                    body += chunk;
                }).on('end', () => {
                    body = JSON.parse(body);
                    toDoList.push(body.item);
                    console.log(toDoList);
                });
            } else if (method === "DELETE") {
                let body = "";
                req.on('error', (err) => {
                    console.error(err);
                }).on("data", (chunk) => {
                    body += chunk;
                }).on("end", () => {
                    body = JSON.parse(body);
                    toDoList.find((el, index) => {
                        if (el === body.item) {
                            toDoList.splice(index, 1);
                        }
                    })

                    res.writeHead(204);
                })
            }
            else {
                res.writeHead(501);
            }
        } else {
            res.writeHead(404);
        }
        res.end()
    })
    .listen(port, () => {
        console.log(`Nodejs server started on port ${port}`);
    });