
# crypto-info

A console application that displays information about Cryptocurrency Providers. Written in Node.js and packaged as a Docker Container.

## Running Locally

This was tested with the Debian snap package `v17.06.2-ce`. Please ensure you have a current version of Docker installed before proceeding and adjust as accordingly if you are [running Docker commands as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/).  

To build the container:

```sh
$ git clone git@github.com:dcd018/crypto-info.git
$ docker build --tag crypto-info ./crypto-info/
```

To run the container:

```sh
$ docker run crypto-info bitcoin
```

Optionally, pass more than one provider:

```sh
$ docker run crypto-info bitcoin ethereum
```

## Running Tests

This module uses Jest as it's primary test engine. Included tests can be run using an npm script:
```sh
$ npm test
```
