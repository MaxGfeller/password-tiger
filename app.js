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

            for(var record in records) {
                console.log(records[record].getGroup())
            }
            $('#select-safe-modal').modal('hide')
        })
    }))
    .on('error', function(err) {
        return alert(err.message)
    })
})

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
