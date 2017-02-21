{"filter":false,"title":"models.js","tooltip":"/models.js","undoManager":{"mark":1,"position":1,"stack":[[{"start":{"row":0,"column":0},"end":{"row":96,"column":1},"action":"remove","lines":["const uuid = require('uuid');","","// this module provides volatile storage, using a `ShoppingList`","// and `Recipes` model. We haven't learned about databases yet,","// so for now we're using in-memory storage. This means each time","// the app stops, our storage gets erased.","","// don't worry to much about how `ShoppingList` and `Recipes`","// are implemented. Our concern in this example is with how","// the API layer is implemented, and getting it to use an","// existing model.","","","function StorageException(message) {","  this.message = message;","  this.name = \"StorageException\";","}","","const ShoppingList = {","  create: function(name, checked) {","    console.log('Creating new shopping list item');","    const item = {","      name: name,","      id: uuid.v4(),","      checked: checked","    };","    this.items[item.id] = item;","    return item;","  },","  get: function() {","    console.log('Retrieving shopping list items');","    return Object.keys(this.items).map(key => this.items[key]);","  },","  delete: function(id) {","    console.log(`Deleting shopping list item \\`${id}\\``);","    delete this.items[id];","  },","  update: function(updatedItem) {","    console.log(`Deleting shopping list item \\`${updatedItem.id}\\``);","    const {id} = updatedItem;","    if (!(id in this.items)) {","      throw StorageException(","        `Can't update item \\`${id}\\` because doesn't exist.`)","    }","    this.items[updatedItem.id] = updatedItem;","    return updatedItem;","  }","};","","function createShoppingList() {","  const storage = Object.create(ShoppingList);","  storage.items = {};","  return storage;","}","","const Recipes = {","  create: function(name, ingredients) {","    console.log('Creating a new recipe');","    const item = {","      name: name,","      id: uuid.v4(),","      ingredients: ingredients","    };","    this.items[item.id] = item;","    return item;","  },","  get: function() {","    console.log('Retreiving recipes');","    return Object.keys(this.items).map(key => this.items[key]);","  },","  delete: function(itemId) {","    console.log(`Deleting recipe with id \\`${itemId}\\``);","    delete this.items[itemId];","  },","  update: function(updatedItem) {","    console.log(`Updating recipe with id \\`${updatedItem.id}\\``);","    const {id} = updatedItem;","    if (!(id in this.items)) {","      throw StorageException(","        `Can't update item \\`${id}\\` because doesn't exist.`)","    }","    this.items[updatedItem.id] = updatedItem;","    return updatedItem;","  }","};","","","function createRecipes() {","  const storage = Object.create(Recipes);","  storage.items = {};","  return storage;","}","","module.exports = {","  ShoppingList: createShoppingList(),","  Recipes: createRecipes()","}"],"id":2}],[{"start":{"row":0,"column":0},"end":{"row":103,"column":2},"action":"insert","lines":["var uuid = require('uuid');","","// this module provides volatile storage, using a `ShoppingList`","// and `Recipes` model. We haven't learned about databases yet,","// so for now we're using in-memory storage. This means each time","// the app stops, our storage gets erased.","","// don't worry to much about how `ShoppingList` and `Recipes`","// are implemented. Our concern in this example is with how","// the API layer is implemented, and getting it to use an","// existing model.","","","function StorageException(message) {","  this.message = message;","  this.name = \"StorageException\";","}","","var ShoppingList = {","  create: function create(name, checked) {","    console.log('Creating new shopping list item');","    var item = {","      name: name,","      id: uuid.v4(),","      checked: checked","    };","    this.items[item.id] = item;","    return item;","  },","  get: function get() {","    var _this = this;","","    console.log('Retrieving shopping list items');","    return Object.keys(this.items).map(function (key) {","      return _this.items[key];","    });","  },","  delete: function _delete(id) {","    console.log('Deleting shopping list item `' + id + '`');","    delete this.items[id];","  },","  update: function update(updatedItem) {","    console.log('Deleting shopping list item `' + updatedItem.id + '`');","    var id = updatedItem.id;","","    if (!(id in this.items)) {","      throw StorageException('Can\\'t update item `' + id + '` because doesn\\'t exist.');","    }","    this.items[updatedItem.id] = updatedItem;","    return updatedItem;","  }","};","","function createShoppingList() {","  var storage = Object.create(ShoppingList);","  storage.items = {};","  return storage;","}","","var Recipes = {","  create: function create(name, ingredients) {","    console.log('Creating a new recipe');","    var item = {","      name: name,","      id: uuid.v4(),","      ingredients: ingredients","    };","    this.items[item.id] = item;","    return item;","  },","  get: function get() {","    var _this2 = this;","","    console.log('Retreiving recipes');","    return Object.keys(this.items).map(function (key) {","      return _this2.items[key];","    });","  },","  delete: function _delete(itemId) {","    console.log('Deleting recipe with id `' + itemId + '`');","    delete this.items[itemId];","  },","  update: function update(updatedItem) {","    console.log('Updating recipe with id `' + updatedItem.id + '`');","    var id = updatedItem.id;","","    if (!(id in this.items)) {","      throw StorageException('Can\\'t update item `' + id + '` because doesn\\'t exist.');","    }","    this.items[updatedItem.id] = updatedItem;","    return updatedItem;","  }","};","","function createRecipes() {","  var storage = Object.create(Recipes);","  storage.items = {};","  return storage;","}","","module.exports = {","  ShoppingList: createShoppingList(),","  Recipes: createRecipes()","};"],"id":3}]]},"ace":{"folds":[],"scrolltop":1093,"scrollleft":0,"selection":{"start":{"row":103,"column":2},"end":{"row":103,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":67,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1487648489197,"hash":"62f67c4c009e959f82685a251197dfd0412d4b7e"}