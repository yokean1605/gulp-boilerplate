'use strict';

/**

Dependencies

**/

const gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssmin = require('gulp-cssmin');


/**

Configuration

**/

const config = {
	tasks: {
		sass: {
			src: './src/sass/*.scss',
			dest: './dist/css'
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
	.pipe(gulp.dest(config.tasks.sass.dest));
});


/**

Tasks to run by default

**/

gulp.task('default', [
	'sass'
]);