
var _templateObject = _taggedTemplateLiteral(['(', ') must match'], ['(', ') must match']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var _require = require('./models'),
    ShoppingList = _require.ShoppingList;

// we're going to add some items to ShoppingList
// so there's some data to look at


ShoppingList.create('beans', true);
ShoppingList.create('tomatoes', false);
ShoppingList.create('peppers', false);

// when the root of this router is called with GET, return
// all current ShoppingList items
router.get('/', function (req, res) {
  res.json(ShoppingList.get());
});

// when a new shopping list item is posted, make sure it's
// got required fields ('name' and 'checked'). if not,
// log an error and return a 400 status code. if okay,
// add new item to ShoppingList and return it with a 201.
router.post('/', jsonParser, function (req, res) {
  // ensure `name` and `budget` are in request body
  var requiredFields = ['name', 'checked'];
  for (var i = 0; i < requiredFields.length; i++) {
    var field = requiredFields[i];
    if (!(field in req.body)) {
      var message = 'Missing `' + field + '` in request body';
      console.error(message);
      return res.status(400).send(message);
    }
  }
  var item = ShoppingList.create(req.body.name, req.body.checked);
  res.status(201).json(item);
});

// when DELETE request comes in with an id in path,
// try to delete that item from ShoppingList.
router.delete('/:id', function (req, res) {
  ShoppingList.delete(req.params.id);
  console.log('Deleted shopping list item `' + req.params.id + '`');
  res.status(204).end();
});

// when PUT request comes in with updated item, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `ShoppingList.update` with updated item.
router.put('/:id', jsonParser, function (req, res) {
  var requiredFields = ['name', 'checked', 'id'];
  for (var i = 0; i < requiredFields.length; i++) {
    var field = requiredFields[i];
    if (!(field in req.body)) {
      var message = 'Missing `' + field + '` in request body';
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    var _message = ('Request path id (' + req.params.id + ') and request body id ')(_templateObject, req.body.id);
    console.error(_message);
    return res.status(400).send(_message);
  }
  console.log('Updating shopping list item `' + req.params.id + '`');
  var updatedItem = ShoppingList.update({
    id: req.params.id,
    name: req.body.name,
    checked: req.body.checked
  });
  res.json(updatedItem);
});

module.exports = router;