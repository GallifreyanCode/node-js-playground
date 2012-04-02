
/**
 * Module dependencies.
 */

var express = require('express'),
routes = require('./routes'),
app = module.exports = express.createServer();
/*mongoose = require('mongoose'),
db = mongoose.connect('mongodb://localhost/nodepad'),
Document = require('./models.js').Document(db);*/

// Configuration

app.configure(function(){
	app.use(express.logger());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
// Routes
var DocumentProvider = require('./models').DocumentProvider;
var DocumentProvider = new DocumentProvider();

app.get('/', routes.index);


app.get('/documents', function(req, res) {
  DocumentProvider.findAll(function(error, documents){
    res.render('test', {
	        locals: {
	          title: 'Mongo Node.js Blog',
	          documents: documents
	        }
	});
  })
});

if (!module.parent) {
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
