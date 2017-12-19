var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return watchify(browserify({entries: './src/ui/app.jsx', extensions: ['.jsx'], debug: true}))
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('build/ui/js'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('**/*.jsx', ['build']);
});

gulp.task('default', ['watch']);