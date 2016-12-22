// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var util = require('util');
var middleware = require('./gulp/proxy');

var config = {
  js: ['app/**/*.js', '!./app/bower_components','!./app/bower_components/**'],
	images: './app/assets/images/*.*'
};

var dist = {
	path: 'dist/',
	images: 'images/',
	fonts: 'fonts/'
}

// Lint Task
gulp.task('lint', function() {
  console.log('linting');
    return gulp.src(config.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(config.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/*.js', ['lint', 'scripts']);
});

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === 'app' || (util.isArray(baseDir) && baseDir.indexOf('app') !== -1)) {
    routes = {
      // Should be '/bower_components': '../bower_components'
      // Waiting for https://github.com/shakyShane/browser-sync/issues/308
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/index.html',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    browser: browser
  });

};

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    'app',
    '.tmp'
  ], [
    '.tmp/{app,components}/**/*.css',
    'app/assets/images/**/*',
    'app/*.html',
    'app/{app,components}/**/*.html',
    'app/{app,components}/**/*.js'
  ]);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);
