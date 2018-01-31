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
	'js'
]);