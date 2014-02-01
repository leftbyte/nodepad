
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var db;
var Document;
var server;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.multipart());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(express.logger({ format: ':method :uri' }));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    db = mongoose.connect('mongodb://localhost/nodepad-development');
};

if ('production' == app.get('env')) {
    app.use(express.logger());
    app.use(express.errorHandler());
    db = mongoose.connect('mongodb://localhost/nodepad-production');
};

if ('test' == app.get('env')) {
    app.use(express.logger({ format: ':method :uri' }));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    db = mongoose.connect('mongodb://localhost/nodepad-test');
};

app.Document = Document = require('./models.js').Document(db);
app.get('/', routes.index);
app.get('/users', user.list);

// GET
app.get('/', function(req, res) {
  res.render('index.jade', {
    locals: {
        title: 'Express'
    }
  });
});

// LIST
app.get('/documents.:format', function(req, res) {
    Document.find().all(function(documents) {
        switch (req.params.format) {
            case 'json':
            // 'documents' will contain all of the documents returned by the query
            res.send(documents.map(function (d) {
                // return a useful representation of the object that res.send can send as JSON
                return d.__doc;
            }));
            break;
            default:
             res.render('documents/index.jade');
        }
    });
});

// CREATE
app.post('/documents.:format?', function(req, res) {
    var document = new Document(req.body['document']);
    document.save(function() {
        switch(req.params.format) {
            case 'json':
            res.send(document.__doc);
            break;

            default:
            res.redirect('/documents');
        }
    });
});

// READ
app.get('/documents/:id.:format?', function(req, res) {
});

// UPDATE
app.put('/documents/:id.:format?', function(req, res) {
});

// DELETE
app.del('/documents/:id.:format?', function(req, res) {
});

if (!module.parent) {
    server = http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
}

module.exports = server;
