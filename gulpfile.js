'use strict';

/**

Dependencies

**/

const gulp = require('gulp'),
sass = require('gulp-sass');


/**

Compiles SASS

**/

gulp.task('sass', () => {
	return gulp.src('./src/sass/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./dist/css'));
});