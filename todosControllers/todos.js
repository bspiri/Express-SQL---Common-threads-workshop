const connection = require('../conf');
const { request } = require('express');

class TodosController {

    // GET - Retrieve all of the data from your table
    getAllTodos(req, res) {
        const sql = 'SELECT * from todo';
        connection.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send('there was an internal server error');
            } else {
                res.json(results);
            }
        });
    }
    //GET - Retrieve specific fields (i.e. id, names, dates, etc.)
    getField(req, res) {
        const sql = `SELECT ${req.query.columns} from todo`;
        console.log(sql);
        connection.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send('there was an internal server error');
            } else {
                res.json(results);
            }
        });
    }

    /*GET - Retrieve a data set with the following filters 
(use one route per filter type):
A filter for data that contains... (e.g. name containing the string 'wcs')
*/
    getContains(req, res) {
        const sql = `SELECT * from todo WHERE task LIKE '%${req.params.value}%'`;
        console.log(sql);
        connection.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send('there was an internal server error');
            } else {
                res.json(results);
            }
        });
    }

    //A filter for data that starts with... (e.g. name beginning with 'campus')

    getStarts(req, res) {
        const sql = `SELECT * from todo WHERE task LIKE '${req.params.value}%'`;
        console.log(sql);
        connection.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send('there was an internal server error');
            } else {
                res.json(results);
            }
        });
    }

    //A filter for data that is greater than... (e.g. date greater than 18/10/2010)
    getGreater(req, res) {
        const sql = `SELECT * from todo WHERE due > '${req.params.value}'`;
        console.log(sql);
        connection.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send('there was an internal server error');
            } else {
                res.json(results);
            }
        });
    }

    //GET - Ordered data recovery (i.e. ascending, descending) - The order should be passed as a route parameter
    getOrdered(req, res) {
        const sql = `SELECT * from todo ORDER BY ${req.params.value}`;
        console.log(sql);
        connection.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send('there was an internal server error');
            } else {
                res.json(results);
            }
        });
    }
    //POST - Insertion of a new entity
    createTodo(req, res) {
        const tododata = req.body;
        console.log(tododata);
        const sql = 'INSERT INTO todo SET ?';
        connection.query(sql, tododata, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error saving todo");
            } else {
                res.json(results);
            }
        });
    }

    //PUT - Modification of an entity
    updateTodo(req, res) {
        const idTodo = req.params.id;
        const formData = req.body;
        console.log(idTodo);
        connection.query('UPDATE todo SET ? WHERE id = ?', [formData, idTodo], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error editing todo");
            } else {
                res.json(results);
            }
        });
    }

    // PUT - Toggle a Boolean value
    updateBool(req, res) {
        const idTodo = req.params.id;
        const formData = req.body;
        console.log(idTodo);
        connection.query('UPDATE todo SET ? WHERE id = ?', [formData, idTodo], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error updating table");
            } else {
                res.json(results);
            }
        });
    }

    //DELETE - Delete an entity
    deleteTodo(req, res) {
        const idTodo = req.params.id;
        console.log(idTodo);
        connection.query('DELETE FROM todo WHERE id = ?', [idTodo], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error deleting todo");
            } else {
                res.json(results);
            }
        });
    }

    //DELETE - Delete all entities where boolean value is false
    deleteFalseTodo(req, res) {
        connection.query("DELETE FROM todo WHERE active=0", (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error deleting todossss");
            } else {
                res.json(results);
            }
        });
    }
}
const todoController = new TodosController();
module.exports = todoController;
