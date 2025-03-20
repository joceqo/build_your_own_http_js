# Bind to a port #at4

Nodejs have 2 packages to create a server
- net https://nodejs.org/api/net.html
- http https://nodejs.org/api/http.html 

The net module is used to create low-level TCP (Transmission Control Protocol) servers and clients. It operates at a lower level than HTTP, meaning it does not understand HTTP requests or responses. It works with raw data streams (binary or text). You need to manually parse any protocol (e.g., HTTP, FTP, custom protocols) on top of it.

The http module is built on top of the net module but specifically for handling HTTP requests and responses. It automatically handles HTTP parsing, headers, status codes, etc.