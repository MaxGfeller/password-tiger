var PasswordSafe = require('password-safe')
var fs = require('fs')
var open = require('nw-open-file')
var concat = require('concat-stream')
var utf8 = require('utf8')
var levelup = require('levelup')
var htmlTree = require('./lib/tree')

var db = levelup('tiger', { db: require('level-js') })

$('#select-safe-modal').modal()

db.get('last-file', function(err, value) {
  if(err || !value) return

  document.querySelector('#filepath').value = value
  document.querySelector('#filepassword').focus()
})

document.querySelector('#filepassword').addEventListener('keyup', function(evt) {
  if(evt.keyCode === 13) document.querySelector('#open-library').click()
})

document.querySelector('#filepath').addEventListener('click', function(evt) {
    open(function(filename) {
        evt.target.value = filename
    })
})

document.querySelector('#open-library').addEventListener('click', function() {
    var filename = document.querySelector('#filepath').value
    var password = utf8.encode(document.querySelector('#filepassword').value.trim())

    if(!filename) return alert('A password file must be selected!')

    fs.createReadStream(filename).pipe(concat(function(contents) {
        var safe = new PasswordSafe({
            password: password
        })

        safe.load(contents, function(err, records) {
            if(err) return alert(err)

            db.put('last-file', filename, function noop() {})

            var tree = buildTree(records)
            htmlTree(tree)

            $('#select-safe-modal').modal('hide')
        })
    }))
    .on('error', function(err) {
        return alert(err.message)
    })
})

function buildTree(records) {
    var obj = {
      records: [],
      children: {}
    }

    Object.keys(records).map(function(key) {
      var r = records[key]

      if(!r.getGroup()) return obj.records.push(r)

      addToTree(obj, r)
    })

    return obj
}

function addToTree(tree, r) {
  var g = r.getGroup()
  var c = tree

  g.split('.').map(function(group) {
    if(!c.children[group]) c.children[group] = {
      name: group,
      children: {},
      records: []
    }
    c = c.children[group]
  })
  c.records.push(r)
}
