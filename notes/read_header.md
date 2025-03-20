# Read header #fs3

## The User-Agent header
The User-Agent header describes the client's user agent.

request
```
// Request line
GET
/user-agent
HTTP/1.1
\r\n

// Headers
Host: localhost:4221\r\n
User-Agent: foobar/1.2.3\r\n  // Read this value
Accept: */*\r\n
\r\n

// Request body (empty)
```

response
```
// Status line
HTTP/1.1 200 OK               // Status code must be 200
\r\n

// Headers
Content-Type: text/plain\r\n
Content-Length: 12\r\n
\r\n

// Response body
foobar/1.2.3                  // The value of `User-Agent`
```

Common format for web browsers:
`User-Agent: <product> / <product-version> <comment>`
`User-Agent: Mozilla/5.0 (<system-information>) <platform> (<platform-details>) <extensions>`