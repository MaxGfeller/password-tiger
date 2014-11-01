var NwBuilder = require('node-webkit-builder')
var nw = new NwBuilder({
    files: [
        './*.json',
        './*.js',
        './*.html',
        './node_modules/**/**',
        './assets/**/**',
        './lib/*.js'
    ],
    appName: 'Password Tiger',
    appVersion: '1.0.0',
    platforms: ['osx', 'linux32', 'linux64'],
    buildType: 'versioned',
    macZip: false,
    macIcns: "assets/images/tiger256.icns"
});

// Log stuff you want
nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});

// And supports callbacks
nw.build(function(err) {
    if(err) console.log(err);
})
