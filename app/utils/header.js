// GET /index.html HTTP/1.1\r\nHost: localhost:4221\r\nUser-Agent: curl/7.64.1\r\nAccept: */*\r\n\r\n
 

function extractRequestParts(string) {
	const requestLine = string.split("\r\n")[0];
	return requestLine;
}

function extractRequestLineInfos(requestLine) {
  const [method, target, httpVersion] = requestLine.split(' ')
  return {method, target, httpVersion}
}

module.exports = {
  extractRequestParts,
  extractRequestLineInfos
}