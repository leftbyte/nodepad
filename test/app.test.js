
// Run $ expresso

/**
 * Module dependencies.
 *
 * Copied from the nodepad example.  This fails with:

   app.test.js GET /: TypeError: Object function (fn) {
        test.on('exit', function() {
            fn(test.assert);
        });
    } has no method 'response'
    at Test.module.exports.GET / [as fn] (/Users/dphung/src/examples/node/nodepad/test/app.test.js:12:12)
    at Test.runParallel (/Users/dphung/node_modules/expresso/bin/expresso:959:10)
    at Test.run (/Users/dphung/node_modules/expresso/bin/expresso:924:18)
    at next (/Users/dphung/node_modules/expresso/bin/expresso:867:22)
    at runSuite (/Users/dphung/node_modules/expresso/bin/expresso:875:7)
    at check (/Users/dphung/node_modules/expresso/bin/expresso:814:12)
    at runFile (/Users/dphung/node_modules/expresso/bin/expresso:819:7)
    at Array.forEach (native)
    at runFiles (/Users/dphung/node_modules/expresso/bin/expresso:796:15)
    at run (/Users/dphung/node_modules/expresso/bin/expresso:759:5)
 */

var app = require('../app');

module.exports = {
  'GET /': function(assert) {
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res) {
        assert.includes(res.body, '<title>Express</title>');
        process.exit();
      });
  }
};
