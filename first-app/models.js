var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var Document = new Schema({
    title: String
  });

mongoose.model('Document', Document);
var Document = mongoose.model('Document');

DocumentProvider = function(){};

DocumentProvider.prototype.findAll = function(callback){
	Document.find({}, function(err, documents){
	callback(null, documents)});
};

DocumentProvider.prototype.save = function(params, callback) {
  var document = new Document({title: params['title']});
  document.save(function (err) {
    callback();
  });
};

exports.DocumentProvider = DocumentProvider;