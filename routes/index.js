const express = require('express');
const TodoController = require('../todosControllers/todos');
const router = express.Router();

// GET - Retrieve all of the data from your table
router.get('/api/todos/getall', TodoController.getAllTodos);

//GET - Retrieve specific fields (i.e. id, names, dates, etc.)
router.get('/api/todos/field', TodoController.getField);

/*GET - Retrieve a data set with the following filters 
(use one route per filter type):
A filter for data that contains... (e.g. name containing the string 'wcs')
*/
router.get('/api/todos/filter/contains/:value', TodoController.getContains);

//A filter for data that starts with... (e.g. name beginning with 'campus')
router.get('/api/todos/filter/starts/:value', TodoController.getStarts);

//A filter for data that is greater than... (e.g. date greater than 18/10/2010)
router.get('/api/todos/filter/greater/:value', TodoController.getGreater);

//GET - Ordered data recovery (i.e. ascending, descending) - The order should be passed as a route parameter
router.get('/api/todos/ordered/:value', TodoController.getOrdered);

//POST - Insertion of a new entity
router.post('/api/todos', TodoController.createTodo);

//PUT - Modification of an entity
router.put('/api/todos/modify/:id', TodoController.updateTodo);

//PUT - Toggle a Boolean value
router.put('/api/todos/toggle/:id', TodoController.updateBool);

//DELETE - Delete all entities where boolean value is false
router.delete('/api/todos/deletefalse', TodoController.deleteFalseTodo);

//DELETE - Delete an entity
router.delete('/api/todos/:id', TodoController.deleteTodo);

module.exports = router;