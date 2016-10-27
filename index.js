
var path = require('path');
var fs = require('fs');

var browserify = require('browserify');


function write (filename) {
	return fs.createWriteStream(path.join('.', 'dist', filename));
}


browserify({
	entries: [
		"src/a/index.js",
		"src/a-b/index.js",
	],
	debug: true,
})
	.transform('require-globify')
	.plugin('factor-bundle', {
		outputs: ['a.js', 'a-b.js'].map(write),
		threshold: 1,
	})
	.bundle()
	.pipe(write('common.js'))

