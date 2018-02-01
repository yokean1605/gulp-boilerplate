'use strict';

/**

Dependencies

**/

const gulp = require('gulp'),
plumber = require('gulp-plumber'),
notify = require('gulp-notify'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename'),
sourcemaps = require('gulp-sourcemaps'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
del = require('del');


/**

Configuration

**/

const config = {
	tasks: {
		sass: {
			src: './src/sass/**/*.scss',
			dest: './dist/css',
			fileSuffix: '.min'
		},
		js: {
			src: [
				'./src/js/site.js',
				'./src/js/site-2.js'
			],
			dest: './dist/js',
			fileName: 'site.js',
			fileSuffix: '.min'
		},
		vendor_js: {
			src: [
				'./src/js/vendor/vendor.js',
				'./src/js/vendor/vendor-2.js'
			],
			dest: './dist/js',
			fileName: 'vendor.js',
			fileSuffix: '.min'
		},
		img: {
			src: './src/img/**/*',
			dest: './dist/img'
		},
		static: {
			src: [
				'./src/static/**/*'
			],
			'dest': './dist/static'
		},
		cleanup: {
			src: './dist/**/*'
		}
	}
}

/**

Shows a desktop notification
detailing any errors caught
by gulp-plumber

**/

const handleError = function(err) {
	notify.onError({
		title: 'Gulp',
		message: err.message,
		file: err.file
	})(err);
	this.emit('end');
}


/**

Compiles SASS to minified CSS with vendor prefixes

**/

gulp.task('sass', () => {
	return gulp.src(config.tasks.sass.src)
	.pipe(plumber({errorHandler: handleError}))
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(cssmin())
	.pipe(rename({suffix: config.tasks.sass.fileSuffix}))
	.pipe(gulp.dest(config.tasks.sass.dest));
});


/**

Concatenates + minifies JS
& generates sourcemaps

**/

gulp.task('js', () => {
	return gulp.src(config.tasks.js.src)
	.pipe(plumber({errorHandler: handleError}))
	.pipe(sourcemaps.init())
	.pipe(concat(config.tasks.js.fileName))
	.pipe(uglify())
	.pipe(rename({suffix: config.tasks.js.fileSuffix}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(config.tasks.js.dest));
});


/**

Concatenates + minifies vendor JS
& generates sourcemaps

**/

gulp.task('vendor_js', () => {
	return gulp.src(config.tasks.vendor_js.src)
	.pipe(plumber({errorHandler: handleError}))
	.pipe(sourcemaps.init())
	.pipe(concat(config.tasks.vendor_js.fileName))
	.pipe(uglify())
	.pipe(rename({suffix: config.tasks.vendor_js.fileSuffix}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(config.tasks.vendor_js.dest));
});


/**

Compresses imagery

**/

gulp.task('img', () => {
    return gulp.src(config.tasks.img.src)
    .pipe(plumber({errorHandler: handleError}))
    .pipe(imagemin({
    	progressive: true, 
    	interlaced: true, 
    	optimizationLevel: 7,
    	verbose: true
    }))
    .pipe(gulp.dest(config.tasks.img.dest));
});


/**

Moves static files to the
build folder

**/

gulp.task('static', () => {
	return gulp.src(config.tasks.static.src)
	.pipe(plumber({errorHandler: handleError}))
	.pipe(gulp.dest(config.tasks.static.dest));
});



/**

Deletes contents of build folder

**/

gulp.task('cleanup', () => {
    return del(config.tasks.cleanup.src, {force: true});
});


/**

Tasks to run by default

**/

gulp.task('default', [
	'sass',
	'js',
	'vendor_js',
	'img',
	'static'
]);


/**

Watches dirs & runs relevant
tasks

**/

gulp.task('watch', () => {
	gulp.watch(config.tasks.sass.src, ['sass']);
	gulp.watch(config.tasks.js.src, ['js']);
	gulp.watch(config.tasks.vendor_js.src, ['vendor_js']);
	gulp.watch(config.tasks.img.src, ['img']);
	gulp.watch(config.tasks.static.src, ['static']);
});