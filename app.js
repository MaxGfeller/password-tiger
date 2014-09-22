var PasswordSafe = require('password-safe')
var fs = require('fs')

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

$('#select-safe-modal').modal()
