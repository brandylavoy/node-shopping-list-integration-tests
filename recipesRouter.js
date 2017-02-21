var _templateObject = _taggedTemplateLiteral(['(', ') must match'], ['(', ') must match']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var _require = require('./models'),
    Recipes = _require.Recipes;

// we're going to add some recipes to Recipes
// so there's some data to look at


Recipes.create('boiled white rice', ['1 cup white rice', '2 cups water', 'pinch of salt']);
Recipes.create('milkshake', ['2 tbsp cocoa', '2 cups vanilla ice cream', '1 cup milk']);

// send back JSON representation of all recipes
// on GET requests to root
router.get('/', function (req, res) {
  res.json(Recipes.get());
});

// when new recipe added, ensure has required fields. if not,
// log error and return 400 status code with hepful message.
// if okay, add new item, and return it with a status 201.
router.post('/', jsonParser, function (req, res) {
  // ensure `name` and `budget` are in request body
  var requiredFields = ['name', 'ingredients'];
  for (var i = 0; i < requiredFields.length; i++) {
    var field = requiredFields[i];
    if (!(field in req.body)) {
      var message = 'Missing `' + field + '` in request body';
      console.error(message);
      return res.status(400).send(message);
    }
  }
  var item = Recipes.create(req.body.name, req.body.ingredients);
  res.status(201).json(item);
});

// Delete recipes (by id)!
router.delete('/:id', function (req, res) {
  Recipes.delete(req.params.id);
  console.log('Deleted shopping list item `' + req.params.ID + '`');
  res.status(204).end();
});

// when PUT request comes in with updated recipe, ensure has
// required fields. also ensure that recipe id in url path, and
// recipe id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `Recipes.updateItem` with updated recipe.
router.put('/:id', jsonParser, function (req, res) {
  var requiredFields = ['name', 'ingredients', 'id'];
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
  var updatedItem = Recipes.update({
    id: req.params.id,
    name: req.body.name,
    ingredients: req.body.ingredients
  });
  res.json(updatedItem);
});

module.exports = router;
