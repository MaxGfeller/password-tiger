var fs = require('fs')
var concat = require('concat-stream')
var PasswordSafe = require('password-safe')

function Adapter(dbPath) {
  this.dbPath = dbPath
  this.scope = null
}

Adapter.prototype.load = function(pw, cb) {
  fs.createReadStream(this.dbPath).pipe(concat(function(contents) {
    var safe = new PasswordSafe({
      password: pw
    })

    safe.load(contents, function(err, hr, records) {
      if(err) return cb(err)

      this.scope = {}

      this.scope.hr = hr
      this.scope.records = records

      cb.call(this, null)
    }.bind(this))
  }.bind(this)))
  .on('error', function(err) {
    return cb(err)
  })
}

module.exports = Adapter
