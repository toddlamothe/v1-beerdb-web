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
var del = require('del');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');

var config = {
  js: ['app/**/*.js', '!./app/bower_components','!./app/bower_components/**'],
	images: './app/assets/images/*.*',
  html: './app/**/*.html',
  temp: './.tmp'
};

var dist = {
	path: 'dist/',
	images: 'assets/images/',
	fonts: 'fonts/'
}

gulp.task('build', ['copy-images', 'minifyjs'], function(){
  del(config.temp);
});

// Lint Task
gulp.task('lint', function() {
  console.log('linting');
    return gulp.src(config.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('copy-images', ['clean-images'], function(){
  return gulp.src([config.images])
    .pipe(gulp.dest(dist.path + dist.images));
});

gulp.task('minifyjs', ['useref', 'templatecache'], function(){
  return gulp.src(['dist/js/scripts.js', 'temp/templates.js'])
    .pipe(concat('scripts.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('useref', function(){
  var assets = useref.assets();

  return gulp.src('./app/**/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('templatecache', function() {
  return gulp.src(config.html)
    .pipe(minifyHtml({empty: true}))
    .pipe(angularTemplatecache(
      'templates.js', {
        module: 'BeerDbApp',
        standAlone: false,
        root: 'app/'
      }
    ))
    .pipe(gulp.dest(config.temp));
});

//Helper Tasks
gulp.task('clean', function() {
  del(dist.path);
  del(config.temp);
})

gulp.task('clean-images', function(){
  del(dist.path + dist.images);
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/*.js', ['lint']);
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

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});

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
