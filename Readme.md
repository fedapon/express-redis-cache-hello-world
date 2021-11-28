# express-redis-cache

This is a proof of concept of using Redis as a cache memory. There are three endpoints:

- **/character**
- **/location**
- **/episode**

This endpoints get data from the https://rickandmortyapi.com/api. The first time the request is made, the answer last between 500~1000 mseg. The next request are answered in less than 10 mseg, more than 50 times faster.

### Requirements

Node.js v14+

### Installation

First of all, you have to clone the project using:
```
$ git clone https://github.com/fedapon/express-redis-cache-helloworld.git
```

Next, we must install dependencies:

```
$ npm install
```

Before trying to run the app, you must create a ***.env*** file using the ***.env.sample*** file as a guide. In this file you must set the port and the host name of Redis server.

Now, to compile the typescript code into javascript and start running the app, you can execute the next script:

```
$ npm run start
```

or, if we want to use nodemon to restart the app in every change, you can use:

```
$ npm run dev
```

Finally the server will be running on http://localhost:3000/.



To run the project with docker-compose using the official Redis image, you can use:

```
$ docker-compose up
```

And to stop the running instances:

```
$ docker-compose down
```



### Reference libraries used in this implementation:

expressjs - https://expressjs.com/en/5x/api.html

axios - https://github.com/axios/axios

ioredis - https://github.com/luin/ioredis

