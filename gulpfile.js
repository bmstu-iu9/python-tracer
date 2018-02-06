var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

gulp.task('build-ui', function () {
    return watchify(browserify({entries: './src/ui/app.jsx', extensions: ['.jsx'], debug: true}))
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('build/ui/js'));
});

gulp.task('build-generator', function () {
    return browserify({entries: './src/ui/tasks/generator.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('generator.js'))
        .pipe(gulp.dest('build/ui/js'));
});

gulp.task('build-tracer', function () {
    return browserify({entries: './src/interpreter/interpreter.js', extensions: ['.js'], debug: true})
        .bundle()
        .pipe(source('interpreter.js'))
        .pipe(gulp.dest('build/ui/js'));
});

gulp.task('watch', ['build-ui', 'build-tracer', 'build-generator'], function () {
    gulp.watch('**/*.jsx', ['build-ui']);
    gulp.watch('./src/interpreter/**/*.js', ['build-tracer']);
    gulp.watch('./src/ui/tasks/*.js', ['build-generator']);
});

gulp.task('default', ['watch']);