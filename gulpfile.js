const gulp = require('gulp');
require('babel-polyfill');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var print = require('gulp-print');

gulp.task('es6', ['libs'], () => {
    browserify('src/app.js')
        .transform('babelify', {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(print())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('libs', function () {
    return gulp.src([
        'node_modules/systemjs/dist/system.js',
        'node_modules/babel-polyfill/dist/polyfill.js'])
        .pipe(print())
        .pipe(gulp.dest('build/libs'));
});

gulp.task('css', function () {
    return gulp.src([
        'app.css'
    ])
        .pipe(print())
        .pipe(gulp.dest('build'));
});

gulp.task('webserver', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('default', ['libs', 'css', 'webserver', 'es6'], () => {
    gulp.watch('src/**/*', ['es6'])
});