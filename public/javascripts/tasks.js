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

	$(document).on('change', '#task_list input', function(){
		var input = $(this);
		var url = '/tasks/' + input.attr('id');

		$.ajax({
			url: url,
			type: 'PUT',
			data: { complete: input.is(':checked') }
		}).done(function(data){
			console.log('updated');
		}).fail(function(msg){
			alert('Something when wrong');
			input.attr('checked', !input.is(':checked'));
		})
	});

	$(document).on('click', '.remove-task', function(){
		var url = '/tasks/' + $(this).data('id');

		$.ajax({
			url: url,
			type: 'DELETE',
			dataType: 'JSON'
		}).done(function(data){
			getAllTasks();
		}).fail(function(msg){
			console.log(msg);
		});
	});
});




