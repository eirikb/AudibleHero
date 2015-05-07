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
var tap = require('gulp-tap');
var stream = require('stream');
var mime = require('mime');

var pck = require('./package.json');
pck.container = pck.container || 'test';
pck.name = pck.name || 'test';
pck.version = pck.version || '1.0.0';
pck.upload = pck.version;
var account = require('../account.json');
gutil.log('Using account', account.account);
var blobService = azure.createBlobService(account.account, account.key);

var serviceProperties = {
  Cors: {
    CorsRule: [{
      AllowedOrigins: ['*'],
      AllowedMethods: ['GET'],
      MaxAgeInSeconds: 3600,
      ExposedHeaders: [],
      AllowedHeaders: []
    }]
  }
};
blobService.setServiceProperties(serviceProperties, function () {
});

var bundler = watchify(browserify('./index.js', watchify.args));
bundler.transform('stringify');
bundler.transform('browserify-ngannotate');
bundler.transform('debowerify');
bundler.transform('browserify-inline');
bundler.transform('bulkify');

function upload(isZip, keepPath, prefix) {
  return tap(function (file) {
    if (!file.contents) return;

    var name = keepPath ? path.relative('./src', file.path) : path.basename(file.path);
    if (prefix) {
      name = prefix + name;
    }
    var dest = /*pck.name + '/' + */pck.upload + '/' + name;
    dest = dest.replace(/\\/g, '/').replace(/\.\.\//g, '');

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
    blobService.createBlockBlobFromStream(pck.container, dest, bufferStream, file.contents.length, metadata, function (err) {
      if (err) gutil.log(err);
      else gutil.log('Finished upload ' + gutil.colors.yellow(dest));
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
    .pipe(gzip({append: false}))
    .pipe(upload(true));
}

gulp.task('js', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

gulp.task('createContainerIfNotExists', function () {
  blobService.createContainerIfNotExists(pck.container, function (err) {
    if (err) gutil.log(err);
  });
});

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less({compress: true}))
    .pipe(concat('app.css'))
    .pipe(gzip({append: false}))
    .pipe(upload(true));
});

gulp.task('watch', function () {
  gulp.watch('./src/less/*.less', ['less']);
});

gulp.task('fonts', function () {
  return gulp.src(['./bower_components/bootstrap/fonts/*', './bower_components/font-awesome/fonts/*'])
    .pipe(upload(false, false, 'fonts/'));
});

gulp.task('defs', function () {
  return gulp.src('./defs/*.json')
    .pipe(upload(false, true));
});

gulp.task('setuser', function () {
  var parts = process.env['USERPROFILE'].split(path.sep);
  var user = ('' + parts[parts.length - 1]).trim().toLowerCase();
  gutil.log('Setting dev user to ', user);
  pck.upload = 'dev-' + user;
});

gulp.task('uglify', function () {
  bundler.transform('uglifyify');
});

gulp.task('assets', function () {
  return gulp.src('./assets/img/*.*')
    .pipe(upload(false, true));
});

gulp.task('usual', ['createContainerIfNotExists', 'assets', 'fonts', 'js', 'less', 'defs', 'watch']);
gulp.task('default', ['setuser', 'usual']);
gulp.task('prod', ['uglify', 'usual']);
