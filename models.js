var mongoose = require('mongoose');

mongoose.model('Document', {
  properties: ['title', 'data', 'tags'],
  indexes: ['title']
});

exports.Document = function(db) {
  return db.model('Document');
};
