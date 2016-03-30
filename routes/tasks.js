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

//PUT the task and updates using the id
router.put('/:id', function(req, res){
	Task.findByIdAndUpdate(
		req.params.id,
		{ $set: { complete: req.body.complete}},
		function(err, task){
			res.send(task);
		});
});

router.delete('/:id', function(req,res){
	Task.findById(req.params.id, function(err, task){
		task.remove();
		res.status(200).send({success: true});
	});
})
module.exports = router;