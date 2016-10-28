
var path = require('path');
var fs = require('fs');

var browserify = require('browserify');


function write (filename) {
	return fs.createWriteStream(path.join('.', 'dist', filename));
}

try {
    fs.mkdirSync(path.join('.', 'dist'));
} catch (e) {}

browserify({
    entries: [
        "src/a/index.js",
        "src/a-b/index.js",
    ],
    debug: true,
})
    .plugin('factor-bundle', {
        outputs: ['a.js', 'b.js'].map(write),
        threshold: 1,
    })
    .bundle()
    .pipe(write('common.js'))

