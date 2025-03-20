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