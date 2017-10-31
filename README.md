# Atomic Web Service (AWS, REST API) for converting PDF files to text/plain, powered by [pdftotext](https://en.wikipedia.org/wiki/Pdftotext) and [Node.js](https://nodejs.org)

Part of the "Automated scientific research workstation" atomic web services ecosystem.

### Requirements/Dependencies

Program runs on modern MacOS and Linux distributions.
To run program you will need:

* [pdftotext](https://en.wikipedia.org/wiki/Pdftotext)
* [Node.js](https://nodejs.org)

### Install

##### For [Ubuntu Server Linux](https://www.ubuntu.com/download/server) distribution

Check all Requirements/Dependencies and install if not found

```
$ git clone https://github.com/malakhovks/pdf-extract-api.git
$ cd pdf-extract-api
$ ./install-dependencies-ubuntu.sh
```

### Use cases

Run service in DEBUG mode (default PORT=3000)

```
$ npm run start
```

Run service in PRODUCTION mode (default PORT=3000)

```
$ npm run start-production
```

