# Extract URL path #ih0

## HTTP Request
An HTTP request is made up of three parts, each separated by a CRLF (\r\n):

- Request line.
- Zero or more headers, each ending with a CRLF.
- Optional request body.

```
// Request line
GET                          // HTTP method
/index.html                  // Request target
HTTP/1.1                     // HTTP version
\r\n                         // CRLF that marks the end of the request line

// Headers
Host: localhost:4221\r\n     // Header that specifies the server's host and port
User-Agent: curl/7.64.1\r\n  // Header that describes the client's user agent
Accept: */*\r\n              // Header that specifies which media types the client can accept
\r\n                         // CRLF that marks the end of the headers

// Request body (empty)
```