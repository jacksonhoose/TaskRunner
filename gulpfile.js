var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var image = require('gulp-image');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserify = require('gulp-browserify');
var source = require('vinyl-source-stream');

var paths = {
	src: {
		bower: './src/bower_components',
		js: './src/js',
		scss: './src/scss',
		img: './src/img'
	},
	dist: {
		js: './dist/js',
		css: './dist/css',
		img: './dist/img'
	},
	karmaConf: __dirname + '/karma.conf.js'
};

var handleError = function(err) {
	console.log(err.toString());
	this.emit('end');
};

gulp.task('browserify', function(){
	return gulp.src(paths.src.js + '/app.js')
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(source('app.bundled.js'))
		.pipe(gulp.dest(paths.src.js));
});

gulp.task('javascript', function() {
	return gulp.src([
			paths.src.js + '/app.bundled.js'
		])
		.pipe(uglify({
			beautify: true
		}))
		.on('error', handleError)
		.pipe(gulp.dest(paths.dist.js));
});

gulp.task('lint', function() {
    return gulp.src(paths.src.js + '/app.bundled.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish));
});

gulp.task('image', function() {
	return gulp.src(paths.src.img + '/**/*')
		.pipe(image())
		.on('error', handleError)
		.pipe(gulp.dest(paths.dist.img));
});

gulp.task('compass', function() {
	return gulp.src(paths.src.scss + '/app.scss')
		.pipe(compass({
			css: paths.dist.css,
			sass: paths.src.scss,
			image: paths.dist.img,
			require: ['breakpoint']
		}))
		.on('error', handleError)
		.pipe(minifyCSS())
		.pipe(gulp.dest(paths.dist.css));
});

gulp.task('test', function(done){
	karma.start({
		configFile: paths.karmaConf,
		singleRun: true
	}, done);
});

gulp.task('watch', function() {
	gulp.watch(paths.src.img + '/**/*', ['image']);
	gulp.watch(paths.src.scss + '/**/*.scss', ['compass']);
	gulp.watch(paths.src.js + '/**/*.js', ['browserify', 'lint', 'javascript']);
});

gulp.task('default', ['compass', 'image', 'browserify', 'lint', 'javascript', 'watch']);