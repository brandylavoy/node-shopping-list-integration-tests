{"filter":false,"title":"test-server.js","tooltip":"/test/test-server.js","undoManager":{"mark":20,"position":20,"stack":[[{"start":{"row":136,"column":3},"end":{"row":137,"column":0},"action":"insert","lines":["",""],"id":4}],[{"start":{"row":137,"column":0},"end":{"row":138,"column":0},"action":"insert","lines":["",""],"id":5}],[{"start":{"row":138,"column":0},"end":{"row":275,"column":3},"action":"insert","lines":["var chai = require('chai');","var chaiHttp = require('chai-http');","","var _require = require('../server'),","    app = _require.app,","    runServer = _require.runServer,","    closeServer = _require.closeServer;","","// this lets us use *should* style syntax in our tests","// so we can do things like `(1 + 1).should.equal(2);`","// http://chaijs.com/api/bdd/","","","var should = chai.should();","","// This let's us make HTTP requests","// in our tests.","// see: https://github.com/chaijs/chai-http","chai.use(chaiHttp);","","describe('Recipes', function () {","","  // Before our tests run, we activate the server. Our `runServer`","  // function returns a promise, and we return the that promise by","  // doing `return runServer`. If we didn't return a promise here,","  // there's a possibility of a race condition where our tests start","  // running before our server has started.","  before(function () {","    return runServer();","  });","","  // although we only have one test module at the moment, we'll","  // close our server at the end of these tests. Otherwise,","  // if we add another test module that also has a `before` block","  // that starts our server, it will cause an error because the","  // server would still be running from the previous tests.","  after(function () {","    return closeServer();","  });","","  // test strategy:","  //   1. make request to `/recipes`","  //   2. inspect response object and prove has right code and have","  //   right keys in response object.","  it('should list items on GET', function () {","    // for Mocha tests, when we're dealing with asynchronous operations,","    // we must either return a Promise object or else call a `done` callback","    // at the end of the test. The `chai.request(server).get...` call is asynchronous","    // and returns a Promise, so we just return it.","    return chai.request(app).get('/recipes').then(function (res) {","      res.should.have.status(200);","      res.should.be.json;","      res.body.should.be.a('array');","","      // because we create three items on app load","      res.body.length.should.be.at.least(1);","      // each item should be an object with key/value pairs","      // for `id`, `name` and `checked`.","      var expectedKeys = ['name', 'ingredients', 'id'];","      res.body.forEach(function (item) {","        item.should.be.a('object');","        item.should.include.keys(expectedKeys);","      });","    });","  });","","  // test strategy:","  //  1. make a POST request with data for a new item","  //  2. inspect response object and prove it has right","  //  status code and that the returned object has an `id`","  it('should add an item on POST', function () {","    var newItem = { name: 'Chili Dog', ingredients: 'chili, hot dog, bun', id: 'testPOST' };","    return chai.request(app).post('/recipes').send(newItem).then(function (res) {","      res.should.have.status(201);","      res.should.be.json;","      res.body.should.be.a('object');","      res.body.should.include.keys('name', 'ingredients', 'id');","      res.body.id.should.not.be.null;","      // response should be deep equal to `newItem` from above if we assign","      // `id` to it from `res.body.id`","      res.body.should.deep.equal(Object.assign(newItem, { id: res.body.id }));","    });","  });","","  // test strategy:","  //  1. initialize some update data (we won't have an `id` yet)","  //  2. make a GET request so we can get an item to update","  //  3. add the `id` to `updateData`","  //  4. Make a PUT request with `updateData`","  //  5. Inspect the response object to ensure it","  //  has right status code and that we get back an updated","  //  item with the right data in it.","  it('should update items on PUT', function () {","    // we initialize our updateData here and then after the initial","    // request to the app, we update it with an `id` property so","    // we can make a second, PUT call to the app.","    var updateData = {","      name: 'Mac and Cheese',","      ingredients: 'Macaroni, and cheese',","      id: 'testPUT'","    };","","    return chai.request(app)","    // first have to get so we have an idea of object to update","    .get('/recipes').then(function (res) {","      updateData.id = res.body[0].id;","      // this will return a promise whose value will be the response","      // object, which we can inspect in the next `then` back. Note","      // that we could have used a nested callback here instead of","      // returning a promise and chaining with `then`, but we find","      // this approach cleaner and easier to read and reason about.","      return chai.request(app).put('/recipes/' + updateData.id).send(updateData);","    })","    // prove that the PUT request has right status code","    // and returns updated item","    .then(function (res) {","      res.should.have.status(200);","      res.should.be.json;","      res.body.should.be.a('object');","      res.body.should.deep.equal(updateData);","    });","  });","","  // test strategy:","  //  1. GET a Recipes items so we can get ID of one","  //  to delete.","  //  2. DELETE an item and ensure we get back a status 204","  it('should delete items on DELETE', function () {","    return chai.request(app)","    // first have to get so we have an `id` of item","    // to delete","    .get('/recipes').then(function (res) {","      return chai.request(app).delete('/recipes/' + res.body[0].id);","    }).then(function (res) {","      res.should.have.status(204);","    });","  });","});"],"id":6}],[{"start":{"row":260,"column":0},"end":{"row":260,"column":1},"action":"insert","lines":["/"],"id":7}],[{"start":{"row":260,"column":1},"end":{"row":260,"column":2},"action":"insert","lines":["/"],"id":8}],[{"start":{"row":260,"column":2},"end":{"row":260,"column":3},"action":"insert","lines":[" "],"id":9}],[{"start":{"row":260,"column":3},"end":{"row":260,"column":4},"action":"insert","lines":["r"],"id":10}],[{"start":{"row":260,"column":4},"end":{"row":260,"column":5},"action":"insert","lines":["e"],"id":11}],[{"start":{"row":260,"column":5},"end":{"row":260,"column":6},"action":"insert","lines":["c"],"id":12}],[{"start":{"row":260,"column":6},"end":{"row":260,"column":7},"action":"insert","lines":["i"],"id":13}],[{"start":{"row":260,"column":7},"end":{"row":260,"column":8},"action":"insert","lines":["p"],"id":14}],[{"start":{"row":260,"column":8},"end":{"row":260,"column":9},"action":"insert","lines":["e"],"id":15}],[{"start":{"row":260,"column":9},"end":{"row":260,"column":10},"action":"insert","lines":[" "],"id":16}],[{"start":{"row":260,"column":10},"end":{"row":260,"column":11},"action":"insert","lines":["b"],"id":17}],[{"start":{"row":260,"column":11},"end":{"row":260,"column":12},"action":"insert","lines":["o"],"id":18}],[{"start":{"row":260,"column":12},"end":{"row":260,"column":13},"action":"insert","lines":["c"],"id":19}],[{"start":{"row":260,"column":13},"end":{"row":260,"column":14},"action":"insert","lines":["k"],"id":20}],[{"start":{"row":260,"column":14},"end":{"row":260,"column":15},"action":"insert","lines":[" "],"id":21}],[{"start":{"row":260,"column":11},"end":{"row":260,"column":12},"action":"insert","lines":["l"],"id":22}],[{"start":{"row":259,"column":5},"end":{"row":260,"column":0},"action":"insert","lines":["",""],"id":23},{"start":{"row":260,"column":0},"end":{"row":260,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":260,"column":2},"end":{"row":261,"column":0},"action":"insert","lines":["",""],"id":24},{"start":{"row":261,"column":0},"end":{"row":261,"column":2},"action":"insert","lines":["  "]}]]},"ace":{"folds":[],"scrolltop":4007,"scrollleft":0,"selection":{"start":{"row":260,"column":2},"end":{"row":260,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":249,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1487651166970,"hash":"f125894fd18a6cb3e5aabc4ace9e2df3a9b4853f"}