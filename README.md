# Atomic Web Service (REST API) for converting PDF files to text/plain, powered by [pdftotext](https://en.wikipedia.org/wiki/Pdftotext) and [Node.js](https://nodejs.org)
Part of the "Automated scientific research workstation" atomic web services ecosystem.
### Requirements/Dependencies
* [pdftotext](https://en.wikipedia.org/wiki/Pdftotext)
* [Node.js](https://nodejs.org)
### Install
Check all Requirements/Dependencies 
```
$ git clone https://github.com/malakhovks/pdf-extract-api.git
$ cd pdf-extract-api
$ ./install-dependencies.sh
```
Run service on default PORT=3000 MODE=debug
```
$ npm run start
```
Run service on default PORT=3000 MODE=production
```
$ npm run start-production
```
### Example use cases