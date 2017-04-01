var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var less = require('gulp-less');
var concat = require('gulp-concat');

var args = watchify.args;
// This will enable sourcemaps - too slow
// args.debug = true;

var bundler = watchify(browserify('./index.js', args));
bundler.transform('stringify');
bundler.transform('browserify-ngannotate');
bundler.transform('debowerify');
bundler.transform('browserify-inline');
bundler.transform('bulkify');

function bundle() {
  return bundler
    .bundle()
    .on('error', function (err) {
      gutil.log('' + err);
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'));
}

gulp.task('js', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less({compress: true}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
  return gulp.src(['./bower_components/bootstrap/fonts/*', './bower_components/font-awesome/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('img', function () {
  return gulp.src('./src/img/*')
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('ext', function () {
  return gulp.src('./ext/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function () {
  bundler.transform('uglifyify');
});

gulp.task('default', ['fonts', 'img', 'ext', 'js', 'less', 'uglify']);
