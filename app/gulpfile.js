var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var less = require('gulp-less');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

var cors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
};

var args = watchify.args;
// This will enable sourcemaps - so slow
// args.debug = true;

var bundler = watchify(browserify('./index.js', args));
bundler.transform('stringify');
bundler.transform('browserify-ngannotate');
bundler.transform('debowerify');
bundler.transform('browserify-inline');
bundler.transform('bulkify');

livereload.listen();

function bundle() {
  return bundler
    .bundle()
    .on('error', function (err) {
      gutil.log('' + err);
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
}

gulp.task('js', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less({compress: true}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch('./src/less/*.less', ['less']);
});

gulp.task('fonts', function () {
  return gulp.src(['./bower_components/bootstrap/fonts/*', './bower_components/font-awesome/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('uglify', function () {
  bundler.transform('uglifyify');
});

gulp.task('webserver', function () {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8000,
    middleware: function () {
      return [cors];
    }
  });
});

gulp.task('default', ['fonts', 'js', 'less', 'watch', 'webserver']);
