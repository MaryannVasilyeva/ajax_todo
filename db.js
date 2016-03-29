var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var Task = new Schema ({
	title: {type: String, required: true},
	complete: {type: Boolean, default: false}
});

mongoose.model('Task', Task);
mongoose.connect('mongodb://localhost/ajax-todo');