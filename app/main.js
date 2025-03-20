const net = require("node:net");
const path = require("node:path");
const fs = require("node:fs");

const {
	extractRequestLine,
	extractRequestLineInfos,
	extractHeaders,
	extractBody,
} = require("./utils/header");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const args = process.argv.slice(2);
const dir = args[args.indexOf("--directory") + 1];

const server = net.createServer((socket) => {
	socket.on("close", () => {
		socket.end();
	});

	socket.on("data", (data) => {
		const request = data.toString();
		const requestLine = extractRequestLine(request);
		const { target, method } = extractRequestLineInfos(requestLine);
		if (target === "/") {
			socket.end("HTTP/1.1 200 OK\r\n\r\n");
		} else {
			if (target === "/user-agent") {
				const headers = extractHeaders(request);
				const userAgent = headers["User-Agent"];
				socket.end(
					`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`,
				);
			} else if (target.startsWith("/echo/")) {
				const text = target.split("/").at(-1);
				socket.end(
					`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${text.length}\r\n\r\n${text}`,
				);
			} else if (target.startsWith("/files")) {
				if (method === "POST") {
					const filename = target.split("/files/")[1];
					const filePath = path.join(dir, filename);
					const body = extractBody(request)

					fs.writeFileSync(filePath, body);
					socket.write("HTTP/1.1 201 Created\r\n\r\n");
					socket.end();
				}
				if (method === "GET") {
					const doesArgHaveDir =
						args.findIndex((arg) => arg === "--directory") !== -1;

					if (!doesArgHaveDir) {
						socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
						socket.end();
						return;
					}

					const fileName = target.split("/files/")[1];
					const filePath = path.join(dir, fileName);

					const isFileExists = fs.existsSync(filePath);
					if (!isFileExists) {
						socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
						socket.end();
					}

					const file = fs.readFileSync(filePath, "utf8");
					const fileLength = file.length;

					socket.write(
						`HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${fileLength}\r\n\r\n${file}`,
					);
				}
			} else {
				socket.end("HTTP/1.1 404 Not Found\r\n\r\n");
			}
		}
	});
});

server.listen(4221, "localhost");
