var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

//GET all the tasks
router.get('/', function(req, res){
	Task.find(function(err, tasks, count){
		res.send(tasks);
	})
});

//POST create a new task
router.post('/', function(req, res){
	new Task({
		title: req.body.title
	}).save(function(err, task, count){
		res.send(task);
	})
});

router.post('/task_template', function(req, res){
	var task = req.body;
	res.render('task', {id: task.id, title: task.title, complete: task.complete})
});

module.exports = router;