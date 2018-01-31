'use strict';

/**

Dependencies

**/

const gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename'),
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
		cleanup: {
			src: './dist/**/*'
		}
	}
}


/**

Compiles SASS to minified CSS with vendor prefixes

**/

gulp.task('sass', () => {
	return gulp.src(config.tasks.sass.src)
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(cssmin())
	.pipe(rename({suffix: config.tasks.sass.fileSuffix}))
	.pipe(gulp.dest(config.tasks.sass.dest));
});


/**

Concatenates & minifies JS

**/

gulp.task('js', () => {
	return gulp.src(config.tasks.js.src)
	.pipe(concat(config.tasks.js.fileName))
	.pipe(uglify())
	.pipe(rename({suffix: config.tasks.js.fileSuffix}))
	.pipe(gulp.dest(config.tasks.js.dest));
});


/**

Concatenates & minifies vendor JS

**/

gulp.task('vendor_js', () => {
	return gulp.src(config.tasks.vendor_js.src)
	.pipe(concat(config.tasks.vendor_js.fileName))
	.pipe(uglify())
	.pipe(rename({suffix: config.tasks.vendor_js.fileSuffix}))
	.pipe(gulp.dest(config.tasks.vendor_js.dest));
});


/**

Compresses imagery

**/

gulp.task('img', () => {
    return gulp.src(config.tasks.img.src)
    .pipe(imagemin({
    	progressive: true, 
    	interlaced: true, 
    	optimizationLevel: 7,
    	verbose: true
    }))
    .pipe(gulp.dest(config.tasks.img.dest));
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
	'vendor_js'
]);