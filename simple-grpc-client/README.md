# simple-grpc-client

This is simple chat room using grpc for HCMUS project. <br>
The goal of this project is to understand how GRPC protocol works.

## Prerequisite
```bash
# Build dockor envoy
$ docker build -t grpc-web-react .
# Run docker
$ docker run -d --name grpc-web-react -p 8080:8080 -p 9901:9901 grpc-web-react
```

## Running the app

```bash
# Running single port (default 3000)
$ npm run start
or
$ yarn run start

# Running multiple port (currently 5 port ( 3000, 3005, 3006, 3007, 3008 ))
$ npm run start:multiport
or
$ yarn run start:multiport
```
