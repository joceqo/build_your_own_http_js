function extractRequestLine(string) {
	const requestLine = string.split("\r\n")[0];
	return requestLine;
}

function extractHeaders(string){
  const indexOfHost = string.indexOf("Host")
  const indexOfHeaderEnd = string.indexOf("\r\n\r\n")

  const rawHeaders = string.substring(indexOfHost, indexOfHeaderEnd)
  const headersLines = rawHeaders.split("\r\n")
  const headers = {}
  for(headerline of headersLines){
    const headerSeparatorIndex = headerline.indexOf(':')
    const headerKey = headerline.substring(0, headerSeparatorIndex)
    const headerValue = headerline.substring(headerSeparatorIndex+1)
    headers[headerKey] = headerValue
  }

  return headers
}

function extractRequestLineInfos(requestLine) {
  const [method, target, httpVersion] = requestLine.split(' ')
  return {method, target, httpVersion}
}

module.exports = {
  extractRequestLine,
  extractRequestLineInfos,
  extractHeaders
}