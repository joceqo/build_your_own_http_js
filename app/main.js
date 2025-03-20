const net = require("node:net");
const {
	extractRequestLine,
	extractRequestLineInfos,
  extractHeaders
} = require("./utils/header");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
	socket.on("close", () => {
		socket.end();
	});

	socket.on("data", (data) => {
    const request = data.toString()
		const requestLine = extractRequestLine(request);
		const { target } = extractRequestLineInfos(requestLine);
		if (target === "/") {
			socket.end("HTTP/1.1 200 OK\r\n\r\n");
		} else {
      if(target === '/user-agent'){
        const headers = extractHeaders(request)
        const userAgent = headers['User-Agent']
        socket.end(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`)
        return
      }
			if (target.startsWith("/echo/")) {
				const text = target.split("/").at(-1);
				socket.end(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${text.length}\r\n\r\n${text}`);
        
			} else {
				socket.end("HTTP/1.1 404 Not Found\r\n\r\n");
			}
		}
	});
});

server.listen(4221, "localhost");
