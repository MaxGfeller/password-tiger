var PasswordSafe = require('password-safe')
var fs = require('fs')
var open = require('nw-open-file')
var concat = require('concat-stream')
var utf8 = require('utf8')

$('#select-safe-modal').modal()

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

            var tree = buildTree(records)

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

      if(!r.getGroup() || r.getGroup().indexOf('.') === -1) return obj.records.push(r)

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

// var passwordDb = fs.readFileSync('gorilla')
//
// var safe = new PasswordSafe({
//     password: ''
// })
//
// safe.load(passwordDb, function(err, records) {
//     if(err) return console.error(err)
//
//     for(var record in records) {
//         console.log(records[record].getPassword())
//     }
//
// })
