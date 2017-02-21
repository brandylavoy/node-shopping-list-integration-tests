
var express = require('express');
var morgan = require('morgan');

var app = express();

var shoppingListRouter = require('./shoppingListRouter');
var recipesRouter = require('./recipesRouter');

// log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// when requests come into `/shopping-list` or
// `/recipes`, we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/shopping-list', shoppingListRouter);
app.use('/recipes', recipesRouter);

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchrnously starting
// our server, since we'll be dealing with promises there.
function runServer() {
  var port = process.env.PORT || 8080;
  return new Promise(function (resolve, reject) {
    app.listen(port, function () {
      console.log('Your app is listening on port ' + port);
      resolve();
    }).on('error', function (err) {
      reject(err);
    });
  });
}

// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
var server = void 0;

function runServer() {
  var port = process.env.PORT || 8080;
  return new Promise(function (resolve, reject) {
    server = app.listen(port, function () {
      console.log('Your app is listening on port ' + port);
      resolve(server);
    }).on('error', function (err) {
      reject(err);
    });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise(function (resolve, reject) {
    console.log('Closing server');
    server.close(function (err) {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(function (err) {
    return console.error(err);
  });
};

module.exports = { app: app, runServer: runServer, closeServer: closeServer };