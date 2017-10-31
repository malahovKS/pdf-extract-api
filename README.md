# Atomic Web Service (AWS, REST API) for converting PDF files to text/plain, powered by [pdftotext](https://en.wikipedia.org/wiki/Pdftotext) and [Node.js](https://nodejs.org)

Part of the "Automated scientific research workstation" atomic web services ecosystem.

### Requirements/Dependencies

Program runs on modern MacOS and Linux distributions.
To run program you will need:

* [pdftotext](https://en.wikipedia.org/wiki/Pdftotext)
* [Node.js](https://nodejs.org)

### Install

##### For [Ubuntu Server Linux](https://www.ubuntu.com/download/server) distribution

```
$ git clone https://github.com/malakhovks/pdf-extract-api.git
$ cd pdf-extract-api
$ ./install-dependencies-ubuntu.sh
```
### AWS Documentation with [apidoc](http://apidocjs.com/)

##### Generate AWS documentation with [apidoc](http://apidocjs.com/):

```
$ npm run apidoc-generate
```

##### Use AWS [apidoc](http://apidocjs.com/) documentation:

With cURL

```
$ curl -X GET http://127.0.0.1:3000/apidoc/
```

With web browser. Navigate to

```
http://127.0.0.1:3000/apidoc/
```

### Use cases

#### Basic usage. Run and config

Run program in **development** mode (default port: 3000; log-mode: development).
[Winston](https://www.npmjs.com/package/winston) logging level will be set to **debug** and transport debug/info/warning logs to Console:

```
$ npm run start-development
```

You can set **port** in ./config/development.json:

```
{
  "port": 3000,
  "log-mode": "development"
}
```

Run program in **production** mode (default port: 3000; log-mode: production).
[Winston](https://www.npmjs.com/package/winston) logging level will be set to **error** and transport error logs to Console:

```
$ npm run start-production
```

You can set **port** in ./config/production.json:

```
{
  "port": 3000,
  "log-mode": "production"
}
```

##### Quick example with cURL:

```
$ curl -X POST -F "pdf=@document.pdf" http://127.0.0.1:3000/apidoc
```

##### Response:

```
HTTP/1.1 200 OK
Content-Type: text/plain
body: raw text
```

#### Use with [PM2](http://pm2.keymetrics.io/). Run and config

###### Coming soon

#### Use with custom queue reverse proxy server. Run and config

###### Coming soon

