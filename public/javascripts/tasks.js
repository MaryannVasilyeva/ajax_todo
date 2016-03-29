$(document).ready(function(){
	function getAllTasks(){
		$.ajax({
			url: '/tasks',
			type: 'GET',
			dataType: 'JSON' 
		}).done(function(data){
			updateTaskList(data);
		}).fail(function(data){
			console.log(data);
		});
	}

	function updateTaskList(tasks) {
	  var list = $('#task_list');
	  list.empty();
	  tasks.forEach( function(task) {
	  	$.ajax({
	  		url: '/tasks/task_template',
	  		type: 'POST',
	  		dataType: 'HTML',
	  		data: {id: task._id, title: task.title, complete: task.complete}
	  	}).done(function(data){
	  		list.append(data);
	  	}).fail(function(data){
	  		console.log(data);
	  	});
	 });
	}

	getAllTasks();

	$('#add_task').on('submit', function(e){
		e.preventDefault();
		var input = $(this).children('input:first');

		$.ajax({
			url: '/tasks', 
			type: 'POST',
			data: {title: input.val()},
			dataType: 'JSON'
		}).done(function(data){
			//what happens on success 2XX HTTP status code
			input.val('');
			console.log(data);
			getAllTasks();
		}).fail(function(data){
			//what happens on any other code but 2XX
			console.log(data);
		});

	});
});