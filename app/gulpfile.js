var azure = require('azure-storage');
var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var gzip = require('gulp-gzip');
var path = require('path');
var less = require('gulp-less');
var concat = require('gulp-concat');
var stream = require('stream');
var mime = require('mime');
var livereload = require('gulp-livereload');
var eventStream = require('event-stream');
var gulpif = require('gulp-if');
var connect = require('gulp-connect');
var fs = require('node-fs');

var isLocalhost = true;
var cors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
};

var args = watchify.args;
// This will enable sourcemaps - too slow
// args.debug = true;

var bundler = watchify(browserify('./index.js', args));
bundler.transform('stringify');
bundler.transform('browserify-ngannotate');
bundler.transform('debowerify');
bundler.transform('browserify-inline');
bundler.transform('bulkify');

livereload.listen();

function upload(isZip, keepPath, prefix) {
  return eventStream.map(function (file, cb) {
    if (!file.contents) return;

    var name = keepPath ? path.relative('./src', file.path) : path.basename(file.path);
    if (prefix) {
      name = prefix + name;
    }
    name = name.replace(/\\/g, '/').replace(/\.\.\//g, '');

    if (isLocalhost) {
      name = path.join('./dist', name);
      var dir = path.dirname(name);
      fs.mkdir(dir, 0777, true, function () {
        fs.writeFile(name, file.contents, function () {
          cb(null, file);
        });
      });
      return;
    }

    var manifest = require('../extension/manifest.json');
    var account = require('../../account.json');
    var blobService = azure.createBlobService(account.account, account.key);
    var dest = manifest.version + '/' + name;

    var m = mime.lookup(name);
    var metadata = {
      contentType: m,
      contentTypeHeader: m
    };

    if (isZip) {
      metadata.contentEncoding = 'gzip';
    }

    var bufferStream = new stream.Transform();
    bufferStream.push(file.contents);
    blobService.createBlockBlobFromStream('audiblehero', dest, bufferStream, file.contents.length, metadata, function (err) {
      if (err) gutil.log(err);
      else gutil.log('Finished upload ' + gutil.colors.yellow(dest));
      cb(null, file);
    });
  });
}

function bundle() {
  return bundler
    .bundle()
    .on('error', function (err) {
      gutil.log('' + err);
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpif(!isLocalhost, gzip({append: false})))
    .pipe(upload(true))
    .pipe(livereload());
}

gulp.task('js', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less({compress: true}))
    .pipe(concat('app.css'))
    .pipe(gulpif(!isLocalhost, gzip({append: false})))
    .pipe(upload(true))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch('./src/less/*.less', ['less']);
});

gulp.task('fonts', function () {
  return gulp.src(['./bower_components/bootstrap/fonts/*', './bower_components/font-awesome/fonts/*'])
    .pipe(upload(false, false, 'fonts/'));
});

gulp.task('img', function () {
  return gulp.src('./src/img/*')
    .pipe(upload(false, false, 'img/'));
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

gulp.task('setProd', function () {
  isLocalhost = false;
});

gulp.task('usual', ['fonts', 'img', 'js', 'less']);
gulp.task('default', ['usual', 'webserver', 'watch']);
gulp.task('prod', ['setProd', 'uglify', 'usual']);
