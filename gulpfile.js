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
	images: 'images/',
	fonts: 'fonts/'
}

gulp.task('build', ['minifyjs', 'copy-images'], function(){
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

gulp.task('useref', function(){
  var assets = useref.assets();

  return gulp.src('./app/index.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

//Helper Tasks
gulp.task('clean', function() {
  del(dist.path);
  del(config.temp);
})

gulp.task('clean-images', function(){
  del(dist.path + dist.images);
});
