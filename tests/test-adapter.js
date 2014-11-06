var test = require('tap').test
var Adapter = require('../lib/adapter')

test('Test adapter', function(t) {
  var a = new Adapter(__dirname + '/db/test.psafe3');

  a.load('tiger-one', function(err) {
    t.notOk(err)
    t.ok(this)
    console.log(this)
    t.end()
  })
})
